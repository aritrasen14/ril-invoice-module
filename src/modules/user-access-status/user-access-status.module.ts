import { Module } from '@nestjs/common';
import { UserAccessStatusController } from './user-access-status.controller';
import { UserAccessStatusService } from './user-access-status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccessStatus } from 'src/common/entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserAccessStatus])],
  controllers: [UserAccessStatusController],
  providers: [UserAccessStatusService],
  exports: [UserAccessStatusService],
})
export class UserAccessStatusModule {}
