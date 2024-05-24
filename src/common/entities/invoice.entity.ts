import { DatabaseBaseEntity } from 'src/common/entities';
import { Column, Entity, Index } from 'typeorm';

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
    type: 'varchar',
    length: 50,
  })
  public invoice_type_code!: string;

  //! associated with invoice_types (TAX, BOS)

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
    length: 255,
  })
  @Index()
  public vendor_code!: string;

  //! Associated with vendors

  @Column({
    type: 'varchar',
    length: 255,
  })
  public invoice_sts_code!: string;

  //! Associated with invoice_status master

  @Column({
    type: 'varchar',
    length: 255,
  })
  public invoice_category_code!: string;

  //! Associated with invoice_categories

  @Column({
    type: 'varchar',
    length: 255,

    nullable: true,
  })
  public generated_inv_file_path: string;

  @Column({
    type: 'varchar',
    length: 255,

    nullable: true,
  })
  public project_code: string;

  //! Associated With Projects Table

  @Column({
    type: 'varchar',
    length: 255,

    nullable: true,
  })
  public company_code: string;

  //! Associated with COMPANIES table

  @Column({
    type: 'varchar',

    nullable: true,
  })
  public project_type_code: string;

  //! Associated with Project_types

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

  //! Associated With Projects Table
  // project_id
}
