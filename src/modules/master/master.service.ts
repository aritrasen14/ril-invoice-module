import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Currency, GstTypes, InvoiceTypes } from 'src/common/entities';
import { Repository } from 'typeorm';

@Injectable()
export class MasterService {
  private readonly logger = new Logger(MasterService.name);

  constructor(
    @InjectRepository(InvoiceTypes)
    private readonly invoiceTypeRepo: Repository<InvoiceTypes>,
    @InjectRepository(Currency)
    private readonly currencyRepo: Repository<Currency>,
    @InjectRepository(GstTypes)
    private readonly gstTypesRepo: Repository<GstTypes>,
  ) {}

  // * Fetch all invoice-types
  async fetchInvoiceTypes() {
    this.logger.debug('Inside fetchInvoiceTypes');
    return await this.invoiceTypeRepo.find();
  }

  // * Fetch all currencies
  async fetchCurrencies() {
    this.logger.debug('Inside fetchCurrencies');
    return await this.currencyRepo.find();
  }

  // * Fetch all gst-types
  async fetchGstTypes() {
    this.logger.debug('Inside fetchGstTypes');
    return await this.gstTypesRepo.find();
  }
}
