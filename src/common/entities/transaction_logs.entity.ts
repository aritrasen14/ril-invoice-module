import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';
import { Invoice } from './invoice.entity';
import { InvoiceStatus } from './invoice_status.entity';

@Entity('transaction_logs')
export class TransactionLogs extends DatabaseBaseEntity {
  @Column({
    type: 'uuid',
    nullable: true,
  })
  invoice_id: string;

  @ManyToOne(() => Invoice)
  @JoinColumn({ name: 'invoice_id', referencedColumnName: 'id' })
  invoice: Invoice;

  @Column({ type: 'uuid' })
  status_id!: string;

  @ManyToOne(() => InvoiceStatus)
  @JoinColumn({ name: 'status_id', referencedColumnName: 'id' })
  status!: InvoiceStatus;

  @CreateDateColumn({
    type: 'timestamptz',
    update: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  date!: Date;
}
