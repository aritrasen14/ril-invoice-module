import { Column, Entity, Index } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';

@Entity('project')
export class Project extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
  })
  @Index()
  public project_name!: string;

  @Column({
    type: 'varchar',
    length: 36,
    unique: true,
  })
  @Index({ unique: true })
  public project_code!: string;

  // vendor_id;

  // //! Associated with Vendors

  // company_id;

  // //! Associated with Company
}
