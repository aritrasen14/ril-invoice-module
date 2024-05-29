import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Currency,
  GstTypes,
  InvoiceStatus,
  InvoiceTypes,
} from 'src/common/entities';
import { Repository } from 'typeorm';
import {
  CurrenciesResponseDto,
  GstTypesResponseDto,
  InvoiceStatusesResponseDto,
  InvoiceTypesResponseDto,
} from './dtos/master.response';
import { INVOICE_STATUS } from 'src/common/enums';

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
    @InjectRepository(InvoiceStatus)
    private readonly invoiceStatusRepo: Repository<InvoiceStatus>,
  ) {}

  // * Fetch all invoice-types
  async fetchInvoiceTypes(): Promise<InvoiceTypesResponseDto[]> {
    this.logger.debug('Inside fetchInvoiceTypes');
    const invoiceTypes = await this.invoiceTypeRepo.find();
    return invoiceTypes.map(
      (invoiceType) => new InvoiceTypesResponseDto(invoiceType),
    );
  }

  // * Fetch all invoice-statuses
  async fetchInvoiceStatuses(): Promise<InvoiceStatusesResponseDto[]> {
    this.logger.debug('Inside fetchInvoiceStatuses');
    const invoiceStatues = await this.invoiceStatusRepo.find();
    return invoiceStatues.map(
      (invoiceStatus) => new InvoiceStatusesResponseDto(invoiceStatus),
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

  // * Fetch invoice-status with code
  async fetchInvoiceStatusWithCode(
    statusCode: INVOICE_STATUS,
  ): Promise<InvoiceStatusesResponseDto> {
    this.logger.debug('Inside fetchInvoiceStatusWithCode');
    const invoiceStatus = await this.invoiceStatusRepo.findOne({
      where: {
        invoice_sts_code: statusCode,
      },
    });
    return new InvoiceStatusesResponseDto(invoiceStatus);
  }
}
