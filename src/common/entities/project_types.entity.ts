import { DatabaseBaseEntity } from 'src/common/entities';
import { Column, Entity, Index } from 'typeorm';

@Entity('project_types')
export class ProjectTypes extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 36,
    unique: true,
  })
  @Index({ unique: true })
  public project_type_code!: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  @Index({ unique: true })
  public project_type_des!: string;
}
