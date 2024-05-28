import { Logger } from '@nestjs/common';
import {
  Company,
  Currency,
  DatabaseBaseEntity,
  GstTypes,
  InvoiceCategories,
  InvoiceStatus,
  InvoiceTypes,
  Project,
  ProjectTypes,
  Vendor,
} from 'src/common/entities';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity('invoice')
export class Invoice extends DatabaseBaseEntity {
  private readonly logger = new Logger(Invoice.name);

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  @Index({ unique: true })
  request_no!: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: true,
  })
  @Index({ unique: true })
  scroll_no: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Index()
  deal_slip!: string;

  @Column({
    type: 'uuid',
  })
  invoice_type_id!: string;

  @ManyToOne(() => InvoiceTypes)
  @JoinColumn({ name: 'invoice_type_id', referencedColumnName: 'id' })
  invoice_type: InvoiceTypes;

  @Column({
    type: 'numeric',
    nullable: true,
  })
  invoice_amount: number;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  invoice_date!: Date;

  // @Column({
  //   type: 'varchar',
  // })
  // @Index()
  // vendor_code!: string;

  @Column({ type: 'uuid' })
  invoice_status_id!: string;

  @ManyToOne(() => InvoiceStatus)
  @JoinColumn({ name: 'invoice_status_id', referencedColumnName: 'id' })
  invoice_status!: InvoiceStatus;

  // @Column({
  //   type: 'varchar',
  //   length: 255,
  // })
  // invoice_category_code!: string;

  @Column({ type: 'uuid' })
  invoice_category_id!: string;

  @ManyToOne(() => InvoiceCategories)
  @JoinColumn({ name: 'invoice_category_id', referencedColumnName: 'id' })
  invoice_category!: InvoiceCategories;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  generated_inv_file_path: string;

  @Column({ type: 'uuid', nullable: true })
  project_id!: string;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  project: Project;

  @Column({ type: 'uuid', nullable: true })
  company_id!: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: Company;

  @Column({ type: 'uuid', nullable: true })
  project_type_id!: string;

  @ManyToOne(() => ProjectTypes)
  @JoinColumn({ name: 'project_type_id', referencedColumnName: 'id' })
  projectType: ProjectTypes;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  management_approval_dt: Date;

  @Column({
    type: 'varchar',
    length: 255,
    select: false,
    nullable: true,
  })
  @Index()
  sap_scroll_number: string;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  sap_scroll_dt: Date;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  payment_advice_number: string;

  @Column({
    type: 'numeric',
    nullable: true,
  })
  adjusted_amount!: number;

  @Column({
    type: 'numeric',
    nullable: true,
  })
  remaining_amount!: number;

  @Column({
    type: 'varchar',
  })
  invoice_no: string;

  // * Invoice Header Details

  @Column({
    type: 'boolean',
  })
  certified_by_eic!: boolean;

  @Column({
    type: 'varchar',
  })
  name_of_eic!: string;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date_of_certification!: Date;

  @Column({
    type: 'boolean',
  })
  certified_abstruct_in_stnd_format!: boolean;

  @Column({
    type: 'boolean',
  })
  final_bill!: boolean;

  @Column({
    type: 'boolean',
  })
  fim_reconcilliation_statement!: boolean;

  @Column({
    type: 'boolean',
  })
  no_claim_certification!: boolean;

  @Column({
    type: 'boolean',
  })
  e_way_bill!: boolean;

  @Column({
    type: 'boolean',
  })
  delivery_Challan!: boolean;

  @Column({
    type: 'boolean',
  })
  lr_copy!: boolean;

  @Column({
    type: 'boolean',
  })
  ld_certification_by_eic!: boolean;

  @Column({
    type: 'boolean',
  })
  msme!: boolean;

  @Column({
    type: 'varchar',
  })
  udayam_number!: string;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  invoice_submission_date!: Date;

  // * Invoice Details

  @Column({
    type: 'varchar',
    length: 255,
  })
  bill_to_party!: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  work_area!: string;

  @Column({
    type: 'uuid',
  })
  @Index()
  vendor_id!: string;

  @ManyToOne(() => Vendor)
  @JoinColumn({ name: 'vendor_id', referencedColumnName: 'id' })
  vendor: Vendor;

  @Column({
    type: 'varchar',
    length: 255,
  })
  gst_no!: string;

  @Column({ type: 'timestamptz' })
  inv_date!: Date;

  @Column({
    type: 'numeric',
    default: 0,
  })
  inv_basic_value!: number;

  @Column({ type: 'uuid' })
  currency_id!: string;

  @ManyToOne(() => Currency)
  @JoinColumn({ name: 'currency_id', referencedColumnName: 'id' })
  currency!: Currency;

  @Column({ type: 'uuid' })
  gst_type_id: string;

  @ManyToOne(() => GstTypes)
  @JoinColumn({ name: 'gst_type_id', referencedColumnName: 'id' })
  gst_type: GstTypes;

  @Column({
    type: 'numeric',
    default: 0,
  })
  cgst_amount!: number;

  @Column({
    type: 'numeric',
    default: 0,
  })
  sgst_amount!: number;

  @Column({
    type: 'numeric',
    default: 0,
  })
  igst_amount!: number;

  @Column({
    type: 'numeric',
    default: 0,
  })
  total_invoice_amount!: number;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  rendered_service_start_dt: Date;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  rendered_service_end_dt: Date;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  job_material_description: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name_of_buyer: string;
}
