import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoles } from 'src/common/entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoles])],
  controllers: [],
  providers: [],
  exports: [],
})
export class UserRoleModule {}
