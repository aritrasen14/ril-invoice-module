import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  ) {}

  // * Fetch all invoices
  async fetchInvoices() {
    this.logger.debug('Inside fetchInvoices');
  }

  // * Submit Invoice
  async submitInvoice(body: SubmitInvoiceRequestDto) {
    this.logger.debug('Inside submitInvoice');

    const { attachments } = body;

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

    const newInvoice = this.invoiceRepo.create({
      ...body,
      request_no: `PR${lastNumber}`,
    });

    const newlyGeneratedInvoice = await this.invoiceRepo.save(newInvoice);

    const promisedAttachments = attachments.map(async (attachment) => {
      return await this.attachmentService.createAttachment({
        ...attachment,
        invoice_id: newlyGeneratedInvoice.id,
      });
    });

    await Promise.all(promisedAttachments);

    const newlyGeneratedInvoiceDetails = await this.fetchInvoiceById(
      newlyGeneratedInvoice.id,
      this.relations,
    );

    return newlyGeneratedInvoiceDetails;
  }

  // * Fetch invoice by id
  async fetchInvoiceById(id: string, relations: string[]) {
    this.logger.debug('Inside fetchInvoiceById');

    return await this.invoiceRepo.findOne({
      where: { id },
      relations,
    });
  }

  // * Fetch all Invoices
  async fetchAllInvoices() {
    this.logger.debug('Inside fetchAllInvoices');
    return await this.invoiceRepo.find({ relations: this.relations });
  }
}
