import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';
import { UserRoles } from './user_roles.entity';
import { CountryCodes } from './country_codes.entity';
import { VendorTypes } from './vendor_types.entity';

@Entity('vendor')
export class Vendor extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
  })
  public vendor_name!: string;

  @Column({
    type: 'varchar',
    length: 255,
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
    type: 'uuid',
  })
  public user_role_id: string;

  @ManyToOne(() => UserRoles)
  @JoinColumn({ name: 'user_role_id', referencedColumnName: 'id' })
  public user_role!: UserRoles;

  @Column({
    type: 'boolean',
    default: false,
  })
  public is_verified!: boolean;

  @Column({
    type: 'uuid',
  })
  public country_code_id!: string;

  @ManyToOne(() => CountryCodes)
  @JoinColumn({ name: 'country_code_id', referencedColumnName: 'id' })
  public country: CountryCodes;

  @Column({
    type: 'uuid',
  })
  public vendor_type_id!: string;

  @ManyToOne(() => VendorTypes)
  @JoinColumn({ name: 'vendor_type_id', referencedColumnName: 'id' })
  public vendor_type: VendorTypes;

  @Column({
    type: 'varchar',
    length: 36,
    unique: true,
  })
  @Index({ unique: true })
  public vendor_code!: string;
}
