import { Column, Index } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';

export class Currency extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 36,
    unique: true,
  })
  @Index({ unique: true })
  public currency_code!: string;

  country_id;

  //! Associated with Country_codes table
}
