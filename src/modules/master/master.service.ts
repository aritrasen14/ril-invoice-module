import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Currency, GstTypes, InvoiceTypes } from 'src/common/entities';
import { Repository } from 'typeorm';
import {
  CurrenciesResponseDto,
  GstTypesResponseDto,
  InvoiceTypesResponseDto,
} from './dtos/master.response';

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
  async fetchInvoiceTypes(): Promise<InvoiceTypesResponseDto[]> {
    this.logger.debug('Inside fetchInvoiceTypes');
    const invoiceTypes = await this.invoiceTypeRepo.find();
    return invoiceTypes.map(
      (invoiceType) => new InvoiceTypesResponseDto(invoiceType),
    );
  }

  // * Fetch all currencies
  async fetchCurrencies(): Promise<CurrenciesResponseDto[]> {
    this.logger.debug('Inside fetchCurrencies');
    const countries = await this.currencyRepo.find({ relations: ['country'] });
    return countries.map((country) => new CurrenciesResponseDto(country));
  }

  // * Fetch all gst-types
  async fetchGstTypes(): Promise<GstTypesResponseDto[]> {
    this.logger.debug('Inside fetchGstTypes');
    const gstTypes = await this.gstTypesRepo.find();
    return gstTypes.map((gstType) => new GstTypesResponseDto(gstType));
  }
}
