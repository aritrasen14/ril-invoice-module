import { Column, Entity, Index } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';

@Entity('user_roles')
export class UserRoles extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 36,
  })
  user_role_des!: string;

  @Column({
    type: 'varchar',
    length: 36,
    unique: true,
  })
  @Index({ unique: true })
  user_role_code!: string;
}
