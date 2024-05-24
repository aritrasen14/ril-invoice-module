import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice, InvoiceDetails, InvoiceHeader } from '../../common/entities';
import { InvoiceService } from './invoice.service';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, InvoiceDetails, InvoiceHeader])],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [],
})
export class InvoiceModule {}
