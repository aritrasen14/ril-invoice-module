import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';
import { UserRoles } from './user_roles.entity';
import { InvoiceStatus } from './invoice_status.entity';

@Entity('user_access_status')
export class UserAccessStatus extends DatabaseBaseEntity {
  @Column({ type: 'uuid' })
  user_role_id!: string;

  @ManyToOne(() => UserRoles)
  @JoinColumn({ name: 'user_role_id', referencedColumnName: 'id' })
  user_role!: UserRoles;

  @Column({
    type: 'varchar',
    length: 36,
  })
  invoice_status_code!: string;

  @Column({ type: 'uuid' })
  invoice_status_id!: string;

  @ManyToOne(() => InvoiceStatus)
  @JoinColumn({ name: 'invoice_status_id', referencedColumnName: 'id' })
  invoice_status!: InvoiceStatus;
}
