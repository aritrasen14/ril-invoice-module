import { Column, Entity } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';

@Entity('audit_status_details')
export class AuditStatusDetails extends DatabaseBaseEntity {
  invoice_id;

  //! Associated with Invoice table

  //   vendor_code;
  // vendor_id

  //! Associated with Vendor table

  @Column({
    type: 'varchar',
    length: 255,
  })
  public rejection_reason!: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  public rejected_by!: string;

  //   Associated with User_roles_master table
}
