import { Column, Entity, Index } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';

@Entity('vendor_types')
export class VendorTypes extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 100,
  })
  public vendor_type_des!: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  @Index({ unique: true })
  public vendor_type_code!: string;
}
