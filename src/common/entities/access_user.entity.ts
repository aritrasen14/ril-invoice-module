import { Column, Entity, Index } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';

@Entity('access_user')
export class AccessUser extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  @Index({ unique: true })
  public email!: string;

  user_role_id;

  //! Associated With user_roles_master

  @Column({
    type: 'boolean',
    default: false,
  })
  public is_verified!: boolean;
}
