import { ApiResponseProperty } from '@nestjs/swagger';
import { EntityResponseDto } from 'src/common/dtos';
import { Currency, GstTypes, InvoiceTypes } from 'src/common/entities';
import { ICountry } from 'src/common/interfaces';

export class InvoiceTypesResponseDto extends EntityResponseDto {
  constructor(invoiceType: InvoiceTypes) {
    super();
    this.id = invoiceType.id;
    this.created_at = invoiceType.created_at;
    this.updated_at = invoiceType.updated_at;
    this.is_active = invoiceType.is_active;
    this.invoice_type_code = invoiceType.invoice_type_code;
    this.invoice_type_des = invoiceType.invoice_type_des;
  }

  @ApiResponseProperty({
    example: 'TAX',
  })
  readonly invoice_type_des: string;

  @ApiResponseProperty({
    example: 'TAX',
  })
  readonly invoice_type_code: string;
}

export class CurrenciesResponseDto
  extends EntityResponseDto
  implements ICountry
{
  constructor(currency: Currency) {
    super();
    this.id = currency.id;
    this.created_at = currency.created_at;
    this.updated_at = currency.updated_at;
    this.is_active = currency.is_active;

    this.currency_code = currency.currency_code;
    this.currency_des = currency.currency_des;

    // * values coming from country
    this.country_code = currency.country?.country_code || null;
    this.country_name = currency.country?.country_name || null;
  }

  @ApiResponseProperty({
    example: 'INR',
  })
  readonly currency_code: string;

  @ApiResponseProperty({
    example: 'INDIAN RUPEES',
  })
  readonly currency_des: string;
  @ApiResponseProperty({
    example: 'IND',
  })
  readonly country_code: string;

  @ApiResponseProperty({
    example: 'INDIA',
  })
  readonly country_name: string;
}

export class GstTypesResponseDto extends EntityResponseDto {
  constructor(gstType: GstTypes) {
    super();
    this.id = gstType.id;
    this.created_at = gstType.created_at;
    this.updated_at = gstType.updated_at;
    this.is_active = gstType.is_active;

    this.gst_type_code = gstType.gst_type_code;
  }

  @ApiResponseProperty({
    example: 'CGST',
  })
  readonly gst_type_code: string;
}
