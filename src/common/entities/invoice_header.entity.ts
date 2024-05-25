import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';
import { InvoiceTypes } from './invoice_types.entity';
import { Invoice } from './invoice.entity';

@Entity('invoice_header')
export class InvoiceHeader extends DatabaseBaseEntity {
  @Column({
    type: 'boolean',
  })
  certified_by_eic!: boolean;

  @Column({
    type: 'varchar',
  })
  name_of_eic!: string;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date_of_certification!: Date;

  @Column({
    type: 'uuid',
  })
  invoice_type_id!: string;

  @ManyToOne(() => InvoiceTypes)
  @JoinColumn({ name: 'invoice_type_id', referencedColumnName: 'id' })
  invoice_type!: InvoiceTypes;

  @Column({
    type: 'boolean',
  })
  certified_abstruct_in_stnd_format!: boolean;

  @Column({
    type: 'boolean',
  })
  final_bill!: boolean;

  @Column({
    type: 'boolean',
  })
  fim_reconcilliation_statement!: boolean;

  @Column({
    type: 'boolean',
  })
  no_claim_certification!: boolean;

  @Column({
    type: 'boolean',
  })
  e_way_bill!: boolean;

  @Column({
    type: 'boolean',
  })
  delivery_Challan!: boolean;

  @Column({
    type: 'boolean',
  })
  lr_copy!: boolean;

  @Column({
    type: 'boolean',
  })
  ld_certification_by_eic!: boolean;

  @Column({
    type: 'boolean',
  })
  msme!: boolean;

  @Column({
    type: 'boolean',
  })
  udayam_number!: boolean;

  @Column({ type: 'uuid' })
  invoice_id!: string;

  @ManyToOne(() => Invoice)
  @JoinColumn({ name: 'invoice_id', referencedColumnName: 'id' })
  invoice: Invoice;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  invoice_submission_date!: Date;
}
