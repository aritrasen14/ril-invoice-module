import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';
import { Invoice } from './invoice.entity';
import { Vendor } from './vendor.entity';
import { UserRoles } from './user_roles.entity';

@Entity('audit_status_details')
export class AuditStatusDetails extends DatabaseBaseEntity {
  @Column({ type: 'uuid' })
  invoice_id!: string;

  @ManyToOne(() => Invoice)
  @JoinColumn({ name: 'invoice_id', referencedColumnName: 'id' })
  invoice: Invoice;

  @Column({ type: 'uuid' })
  vendor_id!: string;

  @ManyToOne(() => Vendor)
  @JoinColumn({ name: 'vendor_id', referencedColumnName: 'id' })
  vendor: Vendor;

  @Column({
    type: 'varchar',
    length: 255,
  })
  rejection_reason!: string;

  @Column({ type: 'uuid' })
  rejected_user_id!: string;

  @ManyToOne(() => UserRoles)
  @JoinColumn({ name: 'rejected_user_id', referencedColumnName: 'id' })
  rejected_by: UserRoles;
}
