// * Submit request DTO for Invoice

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { AttachmentDto } from './attachment.dto';

export class SubmitInvoiceRequestDto {
  // * Invoice Header
  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Value of certified_by_eic',
    example: true,
  })
  @IsDefined()
  @IsBoolean()
  certified_by_eic: boolean;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Name of eic certificate',
    example: 'EIC',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name_of_eic: string;

  @ApiProperty({
    type: Date,
    required: false,
    description: 'Date of certification',
  })
  @IsDefined()
  @Type(() => Date)
  @IsDate()
  date_of_certification: Date;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Invoice type id',
    example: '7e82e4fe-6453-4783-a011-81996fd5aea4',
  })
  @IsDefined()
  @IsUUID()
  invoice_type_id: string;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: 'Certified abstruct in standard format',
    example: true,
  })
  @IsDefined()
  @IsBoolean()
  certified_abstruct_in_stnd_format: boolean;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: 'final bill',
    example: true,
  })
  @IsDefined()
  @IsBoolean()
  final_bill: boolean;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: 'FIM Reconcilliation Statement',
    example: true,
  })
  @IsDefined()
  @IsBoolean()
  fim_reconcilliation_statement: boolean;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: 'No claim certification',
    example: false,
  })
  @IsDefined()
  @IsBoolean()
  no_claim_certification: boolean;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: 'e_way bill',
    example: true,
  })
  @IsDefined()
  @IsBoolean()
  e_way_bill: boolean;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: 'delivery_Challan',
    example: true,
  })
  @IsDefined()
  @IsBoolean()
  delivery_Challan: boolean;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: 'lr_copy',
    example: true,
  })
  @IsDefined()
  @IsBoolean()
  lr_copy: boolean;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: 'ld_certification_by_eic',
    example: true,
  })
  @IsDefined()
  @IsBoolean()
  ld_certification_by_eic: boolean;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: 'msme',
    example: true,
  })
  @IsDefined()
  @IsBoolean()
  msme: boolean;

  @ApiProperty({
    type: String,
    required: true,
    description: 'msme',
    example: 'UDYAM-XY-07-1234567',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  udayam_number: string;

  // * Invoice Details
  @ApiProperty({
    type: String,
    required: true,
    description: 'Name of Buyer',
    example: 'Shashi',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name_of_buyer: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Deal Slip No',
    example: 'DS30037',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  deal_slip: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Bill to party',
    example: '1A2F35846548',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  bill_to_party: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Work Area',
    example: 'Hyderabad',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  work_area: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Vendor id',
    example: '436052fc-8fd1-40bc-aaca-30b715eda7de',
  })
  @IsDefined()
  @IsUUID()
  vendor_id: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Gst no',
    example: '22AAAAA00000A1z5',
  })
  @IsDefined()
  @IsString()
  gst_no: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Invoice No for Vendor Invoice',
    example: 'INV000123',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  invoice_no: string;

  @ApiProperty({
    type: Date,
    required: true,
    description: 'invoice Date',
  })
  @Type(() => Date)
  @IsDate()
  inv_date: Date;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'Invoice Basic Value!',
    example: 1500,
  })
  @IsDefined()
  @IsNumber()
  inv_basic_value: number;

  @ApiProperty({
    type: String,
    required: true,
    description: '',
    example: '8f0356d3-1b2d-4872-8a7f-a979269e0c94',
  })
  @IsDefined()
  @IsUUID()
  currency_id: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Vendor gst_type',
    example: '0908e513-bd16-4224-92f7-83421bfb6fb1',
  })
  @IsDefined()
  @IsUUID()
  gst_type_id: string;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'cgst_amount!',
    example: 135,
  })
  @IsDefined()
  @IsNumber()
  cgst_amount: number;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'sgst_amount!',
    example: 135,
  })
  @IsDefined()
  @IsNumber()
  sgst_amount: number;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'igst_amount!',
    example: 135,
  })
  @IsDefined()
  @IsNumber()
  igst_amount: number;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'total_invoice_amount!',
    example: 135,
  })
  @IsDefined()
  @IsNumber()
  total_invoice_amount: number;

  @ApiProperty({
    type: Date,
    required: true,
    description: 'rendered_service_start_dt',
  })
  @IsDefined()
  @Type(() => Date)
  @IsDate()
  rendered_service_start_dt: Date;

  @ApiProperty({
    type: Date,
    required: true,
    description: 'rendered_service_end_dt',
  })
  @IsDefined()
  @Type(() => Date)
  @IsDate()
  rendered_service_end_dt: Date;

  @ApiProperty({
    type: String,
    required: true,
    description: 'job_material_description',
    example:
      'It was populated in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like aldus...',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  job_material_description: string;

  // * Attachments
  @ApiProperty({
    type: [AttachmentDto],
    description: 'List of attachments',
    example: [
      {
        attachment_type_id: '8a403b87-b64d-4648-a79d-1fbb62c081bb',
        file_name: 'filename',
        file_path: 'www.example.com',
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttachmentDto)
  attachments: AttachmentDto[];

  @ApiProperty({
    type: String,
    required: true,
    description: 'invoice_status_id',
    example: '0874a355-495a-4a17-a54e-1cc87ad714b0',
  })
  @IsDefined()
  @IsUUID()
  invoice_status_id: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'invoice_category_id',
    example: '9d7cf91d-8c5a-41ec-9578-e5d7aaeb363a',
  })
  @IsDefined()
  @IsUUID()
  invoice_category_id: string;

  // invoice_amount
  // invoice_date
  // vendor_code  //! Generated By Nanoid
  // invoice_status_id
  // invoice_category_code
  // invoice_category_id
  // generated_inv_file_path
  // project_id
  // company_id
  // project_type_id
  // management_approval_dt
  // sap_scroll_number
  // sap_scroll_dt
  // payment_advice_number
  // adjusted_amount
  // remaining_amount
}
