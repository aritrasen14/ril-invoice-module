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
  name_of_buyer!: string;
  @Column({
    type: 'varchar',
    length: 255,
  })
  deal_slip!: string;

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
  vendor!: Vendor;

  @Column({
    type: 'varchar',
    length: 255,
  })
  gst_no!: string;

  @Column({ type: 'uuid' })
  invoice_id!: string;

  @ManyToOne(() => Invoice)
  @JoinColumn({ name: 'invoice_id', referencedColumnName: 'id' })
  invoice!: Invoice;

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
}
