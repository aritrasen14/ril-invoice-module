import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { DatabaseBaseEntity } from './database_base_entity.entity';
import { User } from './user.entity';
import { FORGET_PASSWORD_STATUS } from '../enums';

@Entity('forget_password_logs')
export class ForgetPasswordLogs extends DatabaseBaseEntity {
  @Column({ type: 'uuid' })
  @Index()
  user_id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user!: User;

  @Column({ type: 'enum', enum: FORGET_PASSWORD_STATUS })
  status!: string;

  @CreateDateColumn({
    type: 'timestamptz',
    update: false,
  })
  expired_time: Date;
}
