import { Invoice } from 'src/modules/invoice/entity/invoice.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProjectTypes {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

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

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true,
  })
  public created_at!: Date;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true,
  })
  public updated_at!: Date;
}
