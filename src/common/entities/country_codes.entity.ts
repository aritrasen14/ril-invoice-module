import { Column, Entity, Index } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';

@Entity('country_codes')
export class CountryCodes extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 36,
  })
  @Index({ unique: true })
  public country_code!: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  public country_name!: string;
}
