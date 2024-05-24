import { CreateDateColumn, Entity } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';

@Entity('transaction_logs')
export class TransactionLogs extends DatabaseBaseEntity {
  invoice_id;

  //! Associated with Invoices

  status;

  //! Associated with invoice_status

  @CreateDateColumn({
    type: 'timestamptz',
    update: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  public date!: Date;
}
