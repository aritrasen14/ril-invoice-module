import { Column, Entity } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';

@Entity('user_access_status')
export class UserAccessStatus extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 36,
  })
  public user_role_code!: string;

  //! Associated with user_role

  @Column({
    type: 'varchar',
    length: 36,
  })
  public invoice_status_code!: string;

  //! Associated with invoice_status
}
