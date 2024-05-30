import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Invoice } from '../../common/entities';
import { InvoiceResponseDto, SubmitInvoiceRequestDto } from './dtos';
import { AttachmentService } from '../attachment/attachment.service';
import { TransactionLogsService } from '../transaction-logs/transaction-logs.service';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { MasterService } from '../master/master.service';
import { INVOICE_STATUS } from 'src/common/enums';

@Injectable()
export class InvoiceService {
  private readonly logger = new Logger(InvoiceService.name);

  // * storing the relations in the property to reduce redundancy
  private readonly relations = [
    'invoice_type',
    'invoice_status',
    'invoice_category',
    'project',
    'company',
    'project_type',
    'vendor',
    'currency',
    'gst_type',
  ];

  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepo: Repository<Invoice>,
    private readonly attachmentService: AttachmentService,
    private readonly transactionLogsService: TransactionLogsService,
    private readonly masterService: MasterService,
    private dataSource: DataSource,
  ) {}

  // * Submit Invoice
  async submitInvoice(
    body: SubmitInvoiceRequestDto,
  ): Promise<InvoiceResponseDto> {
    this.logger.debug('Inside submitInvoice');

    const { attachments } = body;

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // * Generating the Request No
      const lastInvoice = await this.invoiceRepo.find({
        order: { request_no: 'DESC' },
      });

      let lastNumber = 1000000;
      if (lastInvoice.length > 0) {
        const lastRequestNo = lastInvoice[0].request_no;
        const lastRequestNoNumeric = parseInt(
          lastRequestNo.replace('PR', ''),
          10,
        );
        lastNumber = lastRequestNoNumeric + 1;
      }

      // * Adding ST GENERATED Invoice Status
      const invoice_status =
        await this.masterService.fetchInvoiceStatusWithCode(
          INVOICE_STATUS.ST_GENERATED,
        );

      const newlyGeneratedInvoice = await queryRunner.manager.save(Invoice, {
        ...body,
        invoice_status_id: invoice_status.id,
        request_no: `PR${lastNumber}`,
      });

      if (!newlyGeneratedInvoice) {
        throw new BadRequestException('Error while generating new invoice!');
      }

      // * Adding the attachments
      const promisedAttachments = attachments.map(async (attachment) => {
        return await this.attachmentService.createAttachment(
          {
            ...attachment,
            invoice_id: newlyGeneratedInvoice.id,
          },
          queryRunner,
        );
      });

      await Promise.all(promisedAttachments);

      // * Add the transaction-logs
      const savedTransactionLog =
        await this.transactionLogsService.createTransactionLogs(
          {
            invoice_id: newlyGeneratedInvoice.id,
            status_id: invoice_status.id,
          },
          queryRunner,
        );

      if (!savedTransactionLog) {
        throw new BadRequestException('Error while ');
      }

      await queryRunner.commitTransaction();

      const newlyGeneratedInvoiceDetails = await this.fetchInvoiceById(
        newlyGeneratedInvoice.id,
      );

      return newlyGeneratedInvoiceDetails;
    } catch (err) {
      this.logger.error('Error in submitInvoice', err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  // * Fetch invoice by id
  async fetchInvoiceById(id: string): Promise<InvoiceResponseDto> {
    this.logger.debug('Inside fetchInvoiceById');
    const existingInvoice = await this.invoiceRepo.findOne({
      where: { id },
      relations: this.relations,
    });

    if (!existingInvoice) {
      throw new NotFoundException('No invoice found', {
        cause: 'db',
        description: 'No invoice found!',
      });
    }

    return new InvoiceResponseDto(existingInvoice);
  }

  // * Fetch Invoices
  async fetchInvoices(): Promise<InvoiceResponseDto[]> {
    this.logger.debug('Inside fetchAllInvoices');
    const invoices = await this.invoiceRepo.find({ relations: this.relations });
    return invoices.map((invoice) => new InvoiceResponseDto(invoice));
  }

  // * Fetch all invoices by status
  async fetchInvoicesByStatus(
    invoiceStatusId: string,
  ): Promise<InvoiceResponseDto[]> {
    this.logger.debug('Inside fetchInvoicesByStatus');
    const invoices = await this.invoiceRepo.find({
      where: { invoice_status_id: invoiceStatusId },
      relations: this.relations,
    });
    return invoices.map((invoice) => new InvoiceResponseDto(invoice));
  }

  // * Method for Pagination
  async paginate(
    options: IPaginationOptions,
    whereConditions = {},
  ): Promise<Pagination<InvoiceResponseDto>> {
    const queryBuilder = this.invoiceRepo
      .createQueryBuilder('invoice')
      .innerJoinAndSelect('invoice.vendor', 'vendor')
      .innerJoinAndSelect('vendor.user', 'user');

    for (const [key, value] of Object.entries(whereConditions)) {
      if (key === 'user_id') {
        queryBuilder.andWhere(`user.id = :id`, { id: value });
      } else {
        queryBuilder.andWhere(`invoice.${key} = :${key}`, { [key]: value });
      }
    }

    const invoices = await paginate<Invoice>(queryBuilder, options);
    return {
      items: invoices.items.map((invoice) => new InvoiceResponseDto(invoice)),
      meta: invoices.meta,
    };
  }
}
