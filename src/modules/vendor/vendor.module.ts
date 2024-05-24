import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from '../../common/entities';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';
import { UserRoles } from 'src/common/entities/user_roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor, UserRoles])],
  controllers: [VendorController],
  providers: [VendorService],
  exports: [],
})
export class VendorModule {}
