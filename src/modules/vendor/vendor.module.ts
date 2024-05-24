import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor, UserRoles } from '../../common/entities';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor, UserRoles])],
  controllers: [VendorController],
  providers: [VendorService],
  exports: [],
})
export class VendorModule {}
