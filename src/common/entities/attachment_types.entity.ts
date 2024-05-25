import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  UpdateDateColumn,
} from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';

@Entity('attachment_types')
export class AttachmentTypes extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 36,
    unique: true,
  })
  @Index({ unique: true })
  attachment_type_code!: string;

  @Column({
    type: 'varchar',
    length: 36,
  })
  attachment_type_des!: string;

  @CreateDateColumn({
    type: 'timestamptz',
    update: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  attachment_type_rec_add_dt!: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  attachment_type_rec_mod_dt!: Date;
}
