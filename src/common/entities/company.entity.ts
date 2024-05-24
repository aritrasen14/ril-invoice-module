import { Column, Entity, Index } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';

@Entity('company')
export class Company extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
  })
  public company_name!: string;

  @Column({
    type: 'varchar',
    length: 36,
  })
  public vendor_id!: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  @Index({ unique: true })
  public company_code!: string;
}
