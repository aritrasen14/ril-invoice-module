import { Column, Entity, Index } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';

@Entity('gst_types')
export class GstTypes extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  @Index({ unique: true })
  public gst_type_code!: string;
}
