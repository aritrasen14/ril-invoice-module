import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';
import { Vendor } from './vendor.entity';

@Entity('company')
export class Company extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
  })
  public company_name!: string;

  @Column({ type: 'uuid' })
  public vendor_id!: string;

  @ManyToOne(() => Vendor)
  @JoinColumn({ name: 'vendor_id', referencedColumnName: 'id' })
  public vendor: Vendor;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  @Index({ unique: true })
  public company_code!: string;
}
