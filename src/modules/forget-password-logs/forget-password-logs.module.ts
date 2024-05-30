import { Module } from '@nestjs/common';
import { ForgetPasswordLogsService } from './forget-password-logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForgetPasswordLogs } from 'src/common/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ForgetPasswordLogs])],
  providers: [ForgetPasswordLogsService],
  exports: [ForgetPasswordLogsService],
})
export class ForgetPasswordLogsModule {}
