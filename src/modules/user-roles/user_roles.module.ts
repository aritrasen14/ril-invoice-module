import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccessStatus } from 'src/common/entities';
import { MasterModule } from '../master/master.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserAccessStatus]), MasterModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class UserRoleModule {}
