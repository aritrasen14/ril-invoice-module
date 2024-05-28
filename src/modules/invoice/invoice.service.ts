import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Invoice } from '../../common/entities';
import { InvoiceResponseDto, SubmitInvoiceRequestDto } from './dtos';
import { AttachmentService } from '../attachment/attachment.service';
import { TransactionLogsService } from '../transaction-logs/transaction-logs.service';

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
    private readonly transactionLogs: TransactionLogsService,
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

      const newlyGeneratedInvoice = await queryRunner.manager.save(Invoice, {
        ...body,
        request_no: `PR${lastNumber}`,
      });

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
      await this.transactionLogs.createTransactionLogs(
        {
          invoice_id: newlyGeneratedInvoice.id,
          status_id: body.invoice_status_id,
        },
        queryRunner,
      );

      await queryRunner.commitTransaction();

      const newlyGeneratedInvoiceDetails = await this.fetchInvoiceById(
        newlyGeneratedInvoice.id,
        this.relations,
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
  async fetchInvoiceById(
    id: string,
    relations: string[],
  ): Promise<InvoiceResponseDto> {
    this.logger.debug('Inside fetchInvoiceById');
    const existingInvoice = await this.invoiceRepo.findOne({
      where: { id },
      relations,
    });
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
}
