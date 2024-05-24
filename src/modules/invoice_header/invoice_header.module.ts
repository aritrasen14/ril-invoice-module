import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceHeader } from 'src/common/entities/invoice_header.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceHeader])],
  controllers: [],
  providers: [],
  exports: [],
})
export class InvoiceHeaderModule {}
