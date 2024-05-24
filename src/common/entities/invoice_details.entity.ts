import { Column, Entity } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';

@Entity('invoice_details')
export class InvoiceDetails extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
  })
  public name_of_buyer!: string;
  @Column({
    type: 'varchar',
    length: 255,
  })
  public deal_slip!: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  public bill_to_party!: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  public work_area!: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  public vendor_code!: string;

  //! Associated with Vendors

  @Column({
    type: 'varchar',
    length: 255,
  })
  public gst_no!: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  public invoice_id!: string;

  //! Associated with invoices

  @Column({
    type: 'timestamptz',
  })
  public inv_date!: Date;

  @Column({
    type: 'numeric',
    default: 0,
  })
  public inv_basic_value!: number;

  // currency_code

  //! Associated with currency_master

  gst_type_code;

  //! Associated with gst_types

  @Column({
    type: 'numeric',
    default: 0,
  })
  public cgst_amount!: number;

  @Column({
    type: 'numeric',
    default: 0,
  })
  public sgst_amount!: number;

  @Column({
    type: 'numeric',
    default: 0,
  })
  public igst_amount!: number;

  @Column({
    type: 'numeric',
    default: 0,
  })
  public total_invoice_amount!: number;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  public rendered_service_start_dt: Date;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  public rendered_service_end_dt: Date;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public job_material_description: string;
}
