import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Invoice,
  AdvanceAdjustmentDetails,
  AuditStatusDetails,
  TransactionLogs,
} from '../../common/entities';
import { InvoiceService } from './invoice.service';
import { jwtConfig } from 'src/config/jwt/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { MasterModule } from '../master/master.module';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig),
    TypeOrmModule.forFeature([
      Invoice,
      AdvanceAdjustmentDetails,
      AuditStatusDetails,
      TransactionLogs,
    ]),
    MasterModule,
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
