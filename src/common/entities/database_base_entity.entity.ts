import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Primary Key!',
    example: 'c9bbc294-a4cc-480d-9b3a-6a5768e35982',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'When row is created!',
    example: '2024-05-25 13:00:14.791 +0530',
  })
  @CreateDateColumn({
    type: 'timestamptz',
    update: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at!: Date;

  @ApiProperty({
    description: 'When row is updated!',
    example: '2024-05-25 13:00:14.791 +0530',
  })
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at!: Date;

  @ApiProperty({
    description: 'Whether row is active!',
    example: '2024-05-25 13:00:14.791 +0530',
  })
  @Column({
    type: 'boolean',
    default: true,
  })
  is_active: boolean;

  constructor(props?: Partial<DatabaseBaseEntity>) {
    super();
    if (props) {
      Object.assign(this, props);
    }
  }
}
