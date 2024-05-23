import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';
import { UserRoles } from './user_roles.entity';

/// @setBeforeInsert --> createdAt, updatedAt
/// @setBeforeUpdate --> updatedAt

@Entity('vendor')
export class Vendor extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    select: true,
  })
  public vendor_name!: string;

  @Column({
    type: 'varchar',
    length: 255,
    select: true,
    unique: true,
  })
  @Index({ unique: true })
  public email!: string;

  @Column({
    type: 'varchar',
    length: 255,
    select: false,
  })
  password!: string;

  @Column({
    type: 'varchar',
    length: 255,
    select: true,
  })
  @JoinColumn({ name: 'role', referencedColumnName: 'user_role_code' })
  public role!: string;

  //! Associated With user_roles_master
  @ManyToOne(() => UserRoles, (userRole) => userRole.vendors)
  user_role: UserRoles;

  @Column({
    type: 'boolean',
    default: false,
  })
  public is_verified!: boolean;

  @Column({
    type: 'varchar',
    length: 255,
    select: true,
  })
  country_code: string;

  //! Associated With Country_codes

  // TODO Define Country
  //   @ManyToOne(() => CountryCodes, (country) => country.vendors)
  //   country: CountryMaster;

  @Column({
    type: 'varchar',
    length: 255,
    select: true,
  })
  public vendor_type_code!: string;

  //! associated with vendor_types table

  @Column({
    type: 'varchar',
    length: 36,
    select: true,
  })
  public vendor_code!: string;
}