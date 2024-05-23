import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Base Class for all database entities
 */

export class DatabaseBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @CreateDateColumn({
    type: 'timestamptz',
    update: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  public created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public updated_at!: Date;

  @Column({
    type: 'boolean',
    default: true,
  })
  public is_active: boolean;

  constructor(props?: Partial<DatabaseBaseEntity>) {
    super();
    if (props) {
      Object.assign(this, props);
    }
  }
}
