import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';
import { Invoice } from './invoice.entity';
import { Vendor } from './vendor.entity';
import { UserRoles } from './user_roles.entity';

@Entity('audit_status_details')
export class AuditStatusDetails extends DatabaseBaseEntity {
  @Column({ type: 'uuid' })
  public invoice_id!: string;

  @ManyToOne(() => Invoice)
  @JoinColumn({ name: 'invoice_id', referencedColumnName: 'id' })
  public invoice: Invoice;

  @Column({ type: 'uuid' })
  public vendor_id!: string;

  @ManyToOne(() => Vendor)
  @JoinColumn({ name: 'vendor_id', referencedColumnName: 'id' })
  public vendor: Vendor;

  @Column({
    type: 'varchar',
    length: 255,
  })
  public rejection_reason!: string;

  @Column({ type: 'uuid' })
  public rejected_user_id!: string;

  @ManyToOne(() => UserRoles)
  @JoinColumn({ name: 'rejected_user_id', referencedColumnName: 'id' })
  public rejected_by: UserRoles;
}
