import { Column, Entity } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';

@Entity('attachment')
export class Attachment extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 36,
  })
  public type_code!: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  public file_name!: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  public file_path!: string;

  invoice_id;

  //! Associated with invoices
}
