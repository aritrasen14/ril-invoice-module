import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';
import { Vendor } from './vendor.entity';
import { Company } from './company.entity';

@Entity('project')
export class Project extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
  })
  @Index()
  project_name!: string;

  @Column({
    type: 'varchar',
    length: 36,
    unique: true,
  })
  @Index({ unique: true })
  project_code!: string;

  @Column({ type: 'uuid' })
  vendor_id!: string;

  @ManyToOne(() => Vendor)
  @JoinColumn({ name: 'vendor_id', referencedColumnName: 'id' })
  vendor: Vendor;

  @Column({ type: 'uuid', nullable: true })
  company_id!: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: Company;
}
