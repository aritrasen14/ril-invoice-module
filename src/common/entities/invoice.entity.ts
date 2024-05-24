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
  public request_no!: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: true,
  })
  @Index({ unique: true })
  public scroll_no: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Index()
  public deal_slip_no!: string;

  @Column({
    type: 'uuid',
  })
  public invoice_type_id!: string;

  @ManyToOne(() => InvoiceTypes)
  @JoinColumn({ name: 'invoice_type_id', referencedColumnName: 'id' })
  public invoice_type: InvoiceTypes;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Index()
  public invoice_no!: string;

  @Column({
    type: 'numeric',

    nullable: true,
  })
  public invoice_amount: number;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public invoice_date!: Date;

  @Column({
    type: 'varchar',
  })
  @Index()
  public vendor_code!: string;

  @ManyToOne(() => Vendor)
  @JoinColumn({ name: 'vendor_code', referencedColumnName: 'id' })
  public vendor: Vendor;

  @Column({ type: 'uuid' })
  public invoice_status_id!: string;

  @ManyToOne(() => InvoiceStatus)
  @JoinColumn({ name: 'invoice_status_id', referencedColumnName: 'id' })
  public invoice_status!: InvoiceStatus;

  @Column({
    type: 'varchar',
    length: 255,
  })
  public invoice_category_code!: string;

  @Column({ type: 'uuid' })
  public invoice_category_id!: string;

  @ManyToOne(() => InvoiceCategories)
  @JoinColumn({ name: 'invoice_category_id', referencedColumnName: 'id' })
  public invoice_category!: InvoiceCategories;

  @Column({
    type: 'varchar',
    length: 255,

    nullable: true,
  })
  public generated_inv_file_path: string;

  @Column({ type: 'uuid' })
  public project_id!: string;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  public project: Project;

  @Column({ type: 'uuid', nullable: true })
  public company_id!: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  public company: Company;

  @Column({ type: 'uuid', nullable: true })
  public project_type_id!: string;

  @ManyToOne(() => ProjectTypes)
  @JoinColumn({ name: 'project_type_id', referencedColumnName: 'id' })
  public projectType: ProjectTypes;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  public management_approval_dt: Date;

  @Column({
    type: 'varchar',
    length: 255,
    select: false,
    nullable: true,
  })
  @Index()
  public sap_scroll_number: string;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  public sap_scroll_dt: Date;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public payment_advice_number: string;

  @Column({
    type: 'numeric',
  })
  public adjusted_amount!: number;

  @Column({
    type: 'numeric',
  })
  public remaining_amount!: number;
}
