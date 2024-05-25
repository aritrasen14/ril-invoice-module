import { Column, Entity } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';

@Entity('invoice_status')
export class InvoiceStatus extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 10,
  })
  invoice_sts_code!: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  invoice_sts_des!: string;
}
