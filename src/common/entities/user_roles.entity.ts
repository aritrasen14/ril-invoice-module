import { Column, Entity } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';

@Entity('user_roles')
export class UserRoles extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 36,
    select: true,
  })
  public user_role_des!: string;

  @Column({
    type: 'varchar',
    length: 36,
    select: true,
  })
  public user_role_code!: string;

  //! Associated With vendors
  // @OneToMany(() => Vendor, (vendor) => vendor.user_role)
  // public vendors: Vendor[];
}
