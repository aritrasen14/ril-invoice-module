import {
  BaseEntity,
  Column,
  Entity,
  Index,
  //   ManyToOne, //TODO
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('vendor')
export class Vendor extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

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
  public role!: string;

  @Column({
    type: 'boolean',
    nullable: true,
  })
  public is_verified: boolean;

  @Column({
    type: 'boolean',
    select: true,
    default: true,
  })
  public is_active: boolean;

  @Column({
    type: 'varchar',
    length: 255,
    select: true,
  })
  country_code: string;

  // TODO Define Country
  //   @ManyToOne(() => CountryCodes, (country) => country.vendors)
  //   country: CountryMaster;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true,
  })
  public created_at!: Date;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true,
  })
  public updated_at!: Date;
}
