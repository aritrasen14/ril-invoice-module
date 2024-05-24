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
} from 'src/common/entities';

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
    ]),
  ],
})
export class MasterModule {}
