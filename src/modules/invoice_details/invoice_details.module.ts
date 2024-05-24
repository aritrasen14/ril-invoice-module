import { Module } from '@nestjs/common';
import { InvoiceDetailsService } from './invoice_details.service';
import { InvoiceDetailsController } from './invoice_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceDetails } from '../../common/entities';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceDetails])],
  controllers: [InvoiceDetailsController],
  providers: [InvoiceDetailsService],
  exports: [],
})
export class InvoiceDetailsModule {}
