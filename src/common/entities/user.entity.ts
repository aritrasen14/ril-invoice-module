import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';
import { UserRoles } from './user_roles.entity';
import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';

@Entity('user')
export class User extends DatabaseBaseEntity {
  private readonly logger = new Logger(User.name);
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  @Index({ unique: true })
  email!: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  password!: string;

  @Column({ type: 'uuid' })
  user_role_id!: string;

  @ManyToOne(() => UserRoles)
  @JoinColumn({ name: 'user_role_id', referencedColumnName: 'id' })
  user_role!: UserRoles;

  @Column({
    type: 'boolean',
    default: false,
  })
  is_verified!: boolean;

  @BeforeInsert()
  async setPassword(password: string) {
    this.logger.debug('Inside setPassword');
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
