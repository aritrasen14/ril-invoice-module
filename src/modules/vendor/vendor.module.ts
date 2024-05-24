import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor, Company, Project, AccessUser } from '../../common/entities';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';
import { MasterModule } from '../master/master.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vendor, Company, AccessUser, Project]),
    MasterModule,
  ],
  controllers: [VendorController],
  providers: [VendorService],
  exports: [],
})
export class VendorModule {}
