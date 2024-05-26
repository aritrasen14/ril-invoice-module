import { Column, Entity, Index } from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';
import { USER_ROLES } from '../enums';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user_roles')
export class UserRoles extends DatabaseBaseEntity {
  @ApiProperty({
    description: 'User role Description!',
    example: 'VENDOR',
  })
  @Column({
    type: 'varchar',
    length: 36,
  })
  user_role_des!: string;

  @ApiProperty({
    description: 'User role code!',
    example: 'V',
  })
  @Column({
    type: 'varchar',
    length: 36,
    unique: true,
    enum: USER_ROLES,
  })
  @Index({ unique: true })
  user_role_code!: USER_ROLES;
}
