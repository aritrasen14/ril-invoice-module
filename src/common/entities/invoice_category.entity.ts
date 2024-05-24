import { Column, Entity, Index } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';

@Entity('invoice_categories')
export class InvoiceCategories extends DatabaseBaseEntity {
  @Column({
    type: 'varchar',
    length: 36,
    unique: true,
  })
  @Index({ unique: true })
  public invoice_category_code!: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Index({ unique: true })
  public invoice_category_des!: string;
}
