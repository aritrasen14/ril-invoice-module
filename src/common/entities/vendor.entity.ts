import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';
import { UserRoles } from './user_roles.entity';
import { CountryCodes } from './country_codes.entity';
import { VendorTypes } from './vendor_types.entity';
import { User } from './user.entity';

@Entity('vendor')
export class Vendor extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
  })
  vendor_name!: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  @Index({ unique: true })
  email!: string;

  @Column({
    type: 'uuid',
  })
  user_role_id: string;

  @ManyToOne(() => UserRoles)
  @JoinColumn({ name: 'user_role_id', referencedColumnName: 'id' })
  user_role!: UserRoles;

  @Column({
    type: 'boolean',
    default: false,
  })
  is_verified!: boolean;

  @Column({
    type: 'uuid',
  })
  country_code_id!: string;

  @ManyToOne(() => CountryCodes)
  @JoinColumn({ name: 'country_code_id', referencedColumnName: 'id' })
  country: CountryCodes;

  @Column({
    type: 'uuid',
  })
  vendor_type_id!: string;

  @ManyToOne(() => VendorTypes)
  @JoinColumn({ name: 'vendor_type_id', referencedColumnName: 'id' })
  vendor_type: VendorTypes;

  @Column({
    type: 'varchar',
    length: 36,
    unique: true,
  })
  @Index({ unique: true })
  vendor_code!: string;

  @Column({ type: 'uuid' })
  user_id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user!: User;
}
