import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';
import { CountryCodes } from './country_codes.entity';

@Entity('currency')
export class Currency extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 36,
    unique: true,
  })
  @Index({ unique: true })
  public currency_code!: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  public currency_des!: string;

  @Column({ type: 'uuid' })
  public country_id!: string;

  @ManyToOne(() => CountryCodes)
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
  public country: CountryCodes;
}
