import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';
import { Invoice } from './invoice.entity';

@Entity('advance_adjustment_details')
export class AdvanceAdjustmentDetails extends DatabaseBaseEntity {
  @Column({
    type: 'uuid',
    nullable: true,
  })
  performa_invoice_id: string;

  @ManyToOne(() => Invoice)
  @JoinColumn({ name: 'performa_invoice_id', referencedColumnName: 'id' })
  performa_invoice: Invoice;

  @Column({
    type: 'numeric',
    default: 0,
  })
  inv_basic_value!: number;

  @Column({
    type: 'numeric',
    default: 0,
  })
  base_amount!: number;
  @Column({
    type: 'numeric',
    default: 0,
  })
  utilization_amount!: number;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  utilization_dt!: Date;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  invoice_id: string;

  @ManyToOne(() => Invoice)
  @JoinColumn({ name: 'invoice_id', referencedColumnName: 'id' })
  invoice: Invoice;
}
