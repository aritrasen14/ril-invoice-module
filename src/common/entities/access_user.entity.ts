import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';
import { UserRoles } from './user_roles.entity';

@Entity('access_user')
export class AccessUser extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  @Index({ unique: true })
  public email!: string;

  @Column({ type: 'uuid' })
  public user_role_id!: string;

  @ManyToOne(() => UserRoles)
  @JoinColumn({ name: 'user_role_id', referencedColumnName: 'id' })
  public user_role!: UserRoles;

  @Column({
    type: 'boolean',
    default: false,
  })
  public is_verified!: boolean;
}
