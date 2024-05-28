import { ApiResponseProperty } from '@nestjs/swagger';
import { EntityResponseDto } from 'src/common/dtos';
import { Invoice } from 'src/common/entities';
import {
  ICompany,
  ICurrency,
  IInvoiceCategory,
  IInvoiceStatus,
  IInvoiceTypes,
  IProject,
  IProjectType,
  IVendor,
  IGstTypes,
} from 'src/common/interfaces';

export class InvoiceResponseDto
  extends EntityResponseDto
  implements
    IVendor,
    IInvoiceTypes,
    IInvoiceStatus,
    IInvoiceCategory,
    IProject,
    ICompany,
    IProjectType,
    ICurrency,
    IGstTypes
{
  constructor(invoice: Invoice) {
    super();
    this.id = invoice.id;
    this.request_no = invoice.request_no;
    this.scroll_no = invoice.scroll_no;
    this.invoice_amount = invoice.invoice_amount;
    this.invoice_date = invoice.invoice_date;
    this.generated_inv_file_path = invoice.generated_inv_file_path;
    this.management_approval_dt = invoice.management_approval_dt;
    this.sap_scroll_number = invoice.sap_scroll_number;
    this.sap_scroll_dt = invoice.sap_scroll_dt;
    this.payment_advice_number = invoice.payment_advice_number;
    this.adjusted_amount = invoice.adjusted_amount;
    this.remaining_amount = invoice.remaining_amount;
    this.certified_by_eic = invoice.certified_by_eic;
    this.name_of_eic = invoice.name_of_eic;
    this.date_of_certification = invoice.date_of_certification;
    this.certified_abstruct_in_stnd_format =
      invoice.certified_abstruct_in_stnd_format;
    this.final_bill = invoice.final_bill;
    this.fim_reconcilliation_statement = invoice.fim_reconcilliation_statement;
    this.no_claim_certification = invoice.no_claim_certification;
    this.e_way_bill = invoice.e_way_bill;
    this.delivery_challan = invoice.delivery_challan;
    this.lr_copy = invoice.lr_copy;
    this.ld_certification_by_eic = invoice.ld_certification_by_eic;
    this.msme = invoice.msme;
    this.udayam_number = invoice.udayam_number;
    this.invoice_submission_date = invoice.invoice_submission_date;
    this.name_of_buyer = invoice.name_of_buyer;
    this.deal_slip = invoice.deal_slip;
    this.bill_to_party = invoice.bill_to_party;
    this.work_area = invoice.work_area;
    this.gst_no = invoice.gst_no;
    this.inv_date = invoice.inv_date;
    this.inv_basic_value = invoice.inv_basic_value;
    this.cgst_amount = invoice.cgst_amount;
    this.sgst_amount = invoice.sgst_amount;
    this.igst_amount = invoice.igst_amount;
    this.total_invoice_amount = invoice.total_invoice_amount;
    this.rendered_service_start_dt = invoice.rendered_service_start_dt;
    this.rendered_service_end_dt = invoice.rendered_service_end_dt;
    this.job_material_description = invoice.job_material_description;
    this.invoice_no = invoice.invoice_no;

    // * Values coming from invoice-types
    this.invoice_type_code = invoice.invoice_type?.invoice_type_code || null;
    this.invoice_type_des = invoice.invoice_type?.invoice_type_des || null;

    // * Values coming from invoice-status
    this.invoice_sts_code = invoice.invoice_status?.invoice_sts_code || null;
    this.invoice_sts_des = invoice.invoice_status?.invoice_sts_des || null;

    // * Values coming from invoice-category
    this.invoice_category_code =
      invoice.invoice_category?.invoice_category_code || null;
    this.invoice_category_des =
      invoice.invoice_category?.invoice_category_des || null;

    // * Values coming from project
    this.project_name = invoice.project?.project_name || null;
    this.project_code = invoice.project?.project_code || null;

    // * Values coming from company
    this.company_code = invoice.company?.company_code || null;
    this.company_name = invoice.company?.company_name || null;

    // * Values coming from project-type
    this.project_type_code = invoice.project_type?.project_type_code || null;
    this.project_type_des = invoice.project_type?.project_type_des || null;

    // * Values coming from vendor
    this.vendor_name = invoice.vendor?.vendor_name || null;
    this.email = invoice.vendor?.email || null;
    this.is_verified = invoice.vendor?.is_verified;
    this.vendor_code = invoice.vendor?.vendor_code || null;

    // * Values coming from currency
    this.currency_code = invoice.currency?.currency_code || null;
    this.currency_des = invoice.currency?.currency_des || null;

    // * Values coming from gst_type
    this.gst_type_code = invoice.gst_type?.gst_type_code || null;
  }

  @ApiResponseProperty({
    example: 'PR1000001',
  })
  readonly request_no: string;

  @ApiResponseProperty({
    example: 'SC-M-DS0002-01',
  })
  readonly scroll_no: string;

  @ApiResponseProperty({
    example: 100,
  })
  readonly invoice_amount: number;

  @ApiResponseProperty()
  readonly invoice_date: Date;

  @ApiResponseProperty({ example: 'www.example.com' })
  readonly generated_inv_file_path: string;

  @ApiResponseProperty()
  readonly management_approval_dt: Date;

  @ApiResponseProperty({ example: 'SN1234567' })
  readonly sap_scroll_number: string;

  @ApiResponseProperty()
  readonly sap_scroll_dt: Date;

  @ApiResponseProperty({
    example: 'PAN1234567',
  })
  readonly payment_advice_number: string;

  @ApiResponseProperty({
    example: 0,
  })
  readonly adjusted_amount: number;

  @ApiResponseProperty({
    example: 0,
  })
  readonly remaining_amount: number;

  @ApiResponseProperty()
  readonly certified_by_eic: boolean;

  @ApiResponseProperty({
    example: 'EIC',
  })
  readonly name_of_eic: string;

  @ApiResponseProperty()
  readonly date_of_certification: Date;

  @ApiResponseProperty()
  readonly certified_abstruct_in_stnd_format: boolean;

  @ApiResponseProperty()
  readonly final_bill: boolean;

  @ApiResponseProperty()
  readonly fim_reconcilliation_statement: boolean;

  @ApiResponseProperty()
  readonly no_claim_certification: boolean;

  @ApiResponseProperty()
  readonly e_way_bill: boolean;

  @ApiResponseProperty()
  readonly delivery_challan: boolean;

  @ApiResponseProperty()
  readonly lr_copy: boolean;

  @ApiResponseProperty()
  readonly ld_certification_by_eic: boolean;

  @ApiResponseProperty()
  readonly msme: boolean;

  @ApiResponseProperty({
    example: 'UDYAM-XY-07-1234567',
  })
  readonly udayam_number: string;

  @ApiResponseProperty()
  readonly invoice_submission_date: Date;

  @ApiResponseProperty({
    example: 'Shashi',
  })
  readonly name_of_buyer: string;

  @ApiResponseProperty({
    example: 'DS30037',
  })
  readonly deal_slip: string;

  @ApiResponseProperty({
    example: '1A2F35846548',
  })
  readonly bill_to_party: string;

  @ApiResponseProperty({
    example: 'Hyderabad',
  })
  readonly work_area: string;

  @ApiResponseProperty({
    example: '22AAAAA0000A1Z5',
  })
  readonly gst_no: string;

  @ApiResponseProperty()
  readonly inv_date: Date;

  @ApiResponseProperty({
    example: 1500,
  })
  readonly inv_basic_value: number;

  @ApiResponseProperty({
    example: 135,
  })
  readonly cgst_amount: number;

  @ApiResponseProperty({
    example: 135,
  })
  readonly sgst_amount: number;

  @ApiResponseProperty({
    example: 135,
  })
  readonly igst_amount: number;

  @ApiResponseProperty({
    example: 1770,
  })
  readonly total_invoice_amount: number;

  @ApiResponseProperty()
  readonly rendered_service_start_dt: Date;

  @ApiResponseProperty()
  readonly rendered_service_end_dt: Date;

  @ApiResponseProperty({
    example:
      'It was populated in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like aldus...',
  })
  readonly job_material_description: string;

  @ApiResponseProperty({
    example: 'INV000123',
  })
  readonly invoice_no: string;

  @ApiResponseProperty({
    example: 'Project Lexys A',
  })
  readonly project_name: string;

  @ApiResponseProperty({
    example: '100002',
  })
  readonly project_code: string;

  @ApiResponseProperty({
    example: 'Lexys Technologies',
  })
  readonly company_name: string;

  @ApiResponseProperty({
    example: '12345',
  })
  readonly company_code: string;

  @ApiResponseProperty({
    example: 'SDP',
  })
  readonly project_type_code: string;

  @ApiResponseProperty({
    example: 'STEADY PROJECT',
  })
  readonly project_type_des: string;

  @ApiResponseProperty({
    example: 'TAX',
  })
  readonly invoice_type_des: string;

  @ApiResponseProperty({
    example: 'TAX',
  })
  readonly invoice_type_code: string;

  @ApiResponseProperty({
    example: 'STS',
  })
  readonly invoice_sts_code: string;

  @ApiResponseProperty({
    example: 'ST SUBMITTED',
  })
  readonly invoice_sts_des: string;

  @ApiResponseProperty({
    example: 'SPPLY',
  })
  readonly invoice_category_code: string;

  @ApiResponseProperty({
    example: 'SUPPLY INVOICE',
  })
  readonly invoice_category_des: string;

  @ApiResponseProperty({
    example: 'john',
  })
  readonly vendor_name: string;

  @ApiResponseProperty({
    example: 'john@email.com',
  })
  readonly email: string;

  @ApiResponseProperty()
  readonly is_verified: boolean;

  @ApiResponseProperty({
    example: '1234',
  })
  readonly vendor_code: string;

  @ApiResponseProperty({
    example: 'INR',
  })
  readonly currency_code: string;

  @ApiResponseProperty({
    example: 'INDIAN RUPEES',
  })
  readonly currency_des: string;

  @ApiResponseProperty({
    example: 'CGST',
  })
  readonly gst_type_code: string;
}
