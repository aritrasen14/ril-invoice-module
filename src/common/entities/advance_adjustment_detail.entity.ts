import { Column, Entity } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';

@Entity('advance_adjustment_details')
export class AdvanceAdjustmentDetails extends DatabaseBaseEntity {
  performa_invoice_id;

  //! Associated with Performa Invoice

  @Column({
    type: 'numeric',
    default: 0,
  })
  public inv_basic_value!: number;

  @Column({
    type: 'numeric',
    default: 0,
  })
  public base_amount!: number;
  @Column({
    type: 'numeric',
    default: 0,
  })
  public utilization_amount!: number;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  public utilization_dt!: Date;

  Invoice_id;
  //! Associated with Adjusted Invoices
}
