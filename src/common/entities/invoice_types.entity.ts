import { Column, Entity, Index } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';

@Entity('invoice_types')
export class InvoiceTypes extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 100,
  })
  invoice_type_des!: string;

  @Column({
    type: 'varchar',
    length: 36,
    unique: true,
  })
  @Index({ unique: true })
  invoice_type_code!: string;
}
