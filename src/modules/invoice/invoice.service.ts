import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from '../../common/entities';
import { SubmitInvoiceRequestDto } from './dtos';

@Injectable()
export class InvoiceService {
  private readonly logger = new Logger(InvoiceService.name);

  constructor(
    @InjectRepository(Invoice)
    private invoiceRepo: Repository<Invoice>,
  ) {}

  async fetchInvoices() {
    this.logger.debug('Inside fetchInvoices');
  }

  async submitInvoice(body: SubmitInvoiceRequestDto) {
    this.logger.debug('Inside submitInvoice');

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

    return this.invoiceRepo.save(newInvoice);
  }
}
