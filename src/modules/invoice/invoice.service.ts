import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Invoice } from '../../common/entities';
import { SubmitInvoiceRequestDto } from './dtos';
import { AttachmentService } from '../attachment/attachment.service';

@Injectable()
export class InvoiceService {
  private readonly logger = new Logger(InvoiceService.name);

  // * storing the relations in the property to
  private readonly relations = [
    'invoice_type',
    'invoice_status',
    'invoice_category',
    'project',
    'company',
    'projectType',
    'vendor',
    'currency',
    'gst_type',
  ];

  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepo: Repository<Invoice>,
    private readonly attachmentService: AttachmentService,
    private dataSource: DataSource,
  ) {}

  // * Submit Invoice
  async submitInvoice(body: SubmitInvoiceRequestDto) {
    this.logger.debug('Inside submitInvoice');

    const { attachments } = body;

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
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
  async fetchInvoiceById(id: string, relations: string[]) {
    this.logger.debug('Inside fetchInvoiceById');

    return await this.invoiceRepo.findOne({
      where: { id },
      relations,
    });
  }

  // * Fetch Invoices
  async fetchInvoices() {
    this.logger.debug('Inside fetchAllInvoices');
    return await this.invoiceRepo.find({ relations: this.relations });
  }

  // * Fetch all invoices by status
  async fetchInvoicesByStatus(invoiceStatusId: string) {
    this.logger.debug('Inside fetchInvoicesByStatus');
    return await this.invoiceRepo.find({
      where: { invoice_status_id: invoiceStatusId },
      relations: this.relations,
    });
  }
}
