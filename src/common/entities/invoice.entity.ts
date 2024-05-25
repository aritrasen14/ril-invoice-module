import {
  Company,
  DatabaseBaseEntity,
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
  deal_slip_no!: string;

  @Column({
    type: 'uuid',
  })
  invoice_type_id!: string;

  @ManyToOne(() => InvoiceTypes)
  @JoinColumn({ name: 'invoice_type_id', referencedColumnName: 'id' })
  invoice_type: InvoiceTypes;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Index()
  invoice_no!: string;

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

  @Column({
    type: 'varchar',
  })
  @Index()
  vendor_code!: string;

  @ManyToOne(() => Vendor)
  @JoinColumn({ name: 'vendor_code', referencedColumnName: 'id' })
  vendor: Vendor;

  @Column({ type: 'uuid' })
  invoice_status_id!: string;

  @ManyToOne(() => InvoiceStatus)
  @JoinColumn({ name: 'invoice_status_id', referencedColumnName: 'id' })
  invoice_status!: InvoiceStatus;

  @Column({
    type: 'varchar',
    length: 255,
  })
  invoice_category_code!: string;

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

  @Column({ type: 'uuid' })
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
  })
  adjusted_amount!: number;

  @Column({
    type: 'numeric',
  })
  remaining_amount!: number;
}
