import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';
import { Vendor } from './vendor.entity';
import { Invoice } from './invoice.entity';
import { Currency } from './currency.entity';
import { GstTypes } from './gst_types.entity';

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
    type: 'uuid',
  })
  @Index()
  public vendor_id!: string;

  @ManyToOne(() => Vendor)
  @JoinColumn({ name: 'vendor_id', referencedColumnName: 'id' })
  public vendor!: Vendor;

  @Column({
    type: 'varchar',
    length: 255,
  })
  public gst_no!: string;

  @Column({ type: 'uuid' })
  public invoice_id!: string;

  @ManyToOne(() => Invoice)
  @JoinColumn({ name: 'invoice_id', referencedColumnName: 'id' })
  public invoice!: Invoice;

  @Column({ type: 'timestamptz' })
  public inv_date!: Date;

  @Column({
    type: 'numeric',
    default: 0,
  })
  public inv_basic_value!: number;

  @Column({ type: 'uuid' })
  public currency_id!: string;

  @ManyToOne(() => Currency)
  @JoinColumn({ name: 'currency_id', referencedColumnName: 'id' })
  public currency!: Currency;

  @Column({ type: 'uuid' })
  public gst_type_id: string;

  @ManyToOne(() => GstTypes)
  @JoinColumn({ name: 'gst_type_id', referencedColumnName: 'id' })
  public gst_type: GstTypes;

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
