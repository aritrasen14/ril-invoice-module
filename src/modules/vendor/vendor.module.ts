import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor, Company, Project, User } from '../../common/entities';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';
import { MasterModule } from '../master/master.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vendor, Company, User, Project]),
    MasterModule,
  ],
  controllers: [VendorController],
  providers: [VendorService],
  exports: [],
})
export class VendorModule {}
