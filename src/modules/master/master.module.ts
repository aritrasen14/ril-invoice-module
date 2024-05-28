import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AttachmentTypes,
  UserRoles,
  CountryCodes,
  GstTypes,
  InvoiceCategories,
  InvoiceStatus,
  InvoiceTypes,
  VendorTypes,
  ProjectTypes,
  Currency,
} from 'src/common/entities';
import { MasterController } from './master.controller';
import { MasterService } from './master.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CountryCodes,
      InvoiceStatus,
      AttachmentTypes,
      VendorTypes,
      InvoiceTypes,
      UserRoles,
      InvoiceCategories,
      GstTypes,
      ProjectTypes,
      Currency,
    ]),
  ],
  controllers: [MasterController],
  providers: [MasterService],
  exports: [MasterService],
})
export class MasterModule {}
