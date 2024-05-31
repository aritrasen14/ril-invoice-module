import { Column, Entity, Index } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';
import { INVOICE_TYPE } from '../enums';

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
    enum: INVOICE_TYPE,
  })
  @Index({ unique: true })
  invoice_type_code!: INVOICE_TYPE;
}
