import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';
import { AttachmentTypes } from './attachment_types.entity';
import { Invoice } from './invoice.entity';

@Entity('attachment')
export class Attachment extends DatabaseBaseEntity {
  @Column({ type: 'uuid' })
  attachment_type_id!: string;

  @ManyToOne(() => AttachmentTypes)
  @JoinColumn({ name: 'attachment_type_id', referencedColumnName: 'id' })
  attachment_type: AttachmentTypes;

  @Column({
    type: 'varchar',
    length: 255,
  })
  file_name!: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  file_path!: string;

  @Column({ type: 'uuid' })
  invoice_id!: string;

  @ManyToOne(() => Invoice)
  @JoinColumn({ name: 'invoice_id', referencedColumnName: 'id' })
  invoice!: Invoice;
}
