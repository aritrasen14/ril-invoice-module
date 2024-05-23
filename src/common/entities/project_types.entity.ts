import { DatabaseBaseEntity, Invoice } from 'src/common/entities';
import { Column, Entity, Index, OneToMany } from 'typeorm';

@Entity()
export class ProjectTypes extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    select: true,
    unique: true,
  })
  @Index({ unique: true })
  public project_type_code!: string;

  @OneToMany(() => Invoice, (invoice) => invoice.project_type_code)
  invoices: Invoice[];

  @Column({
    type: 'varchar',
    length: 255,
    select: true,
  })
  public project_type_des!: string;
}
