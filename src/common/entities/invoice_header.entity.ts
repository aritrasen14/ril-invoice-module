import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';
import { InvoiceTypes } from './invoice_types.entity';
import { Invoice } from './invoice.entity';

@Entity('invoice_header')
export class InvoiceHeader extends DatabaseBaseEntity {
  @Column({
    type: 'boolean',
  })
  public certified_by_eic!: boolean;

  @Column({
    type: 'varchar',
  })
  public name_of_eic!: string;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public date_of_certification!: Date;

  @Column({
    type: 'uuid',
  })
  public invoice_type_id!: string;

  @ManyToOne(() => InvoiceTypes)
  @JoinColumn({ name: 'invoice_type_id', referencedColumnName: 'id' })
  public invoice_type!: InvoiceTypes;

  @Column({
    type: 'boolean',
  })
  public certified_abstruct_in_stnd_format!: boolean;

  @Column({
    type: 'boolean',
  })
  public final_bill!: boolean;

  @Column({
    type: 'boolean',
  })
  public fim_reconcilliation_statement!: boolean;

  @Column({
    type: 'boolean',
  })
  public no_claim_certification!: boolean;

  @Column({
    type: 'boolean',
  })
  public e_way_bill!: boolean;

  @Column({
    type: 'boolean',
  })
  public delivery_Challan!: boolean;

  @Column({
    type: 'boolean',
  })
  public lr_copy!: boolean;

  @Column({
    type: 'boolean',
  })
  public ld_certification_by_eic!: boolean;

  @Column({
    type: 'boolean',
  })
  public msme!: boolean;

  @Column({
    type: 'boolean',
  })
  public udayam_number!: boolean;

  @Column({ type: 'uuid' })
  public invoice_id!: string;

  @ManyToOne(() => Invoice)
  @JoinColumn({ name: 'invoice_id', referencedColumnName: 'id' })
  public invoice: Invoice;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public invoice_submission_date!: Date;
}
