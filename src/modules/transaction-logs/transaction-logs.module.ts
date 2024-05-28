import { Module } from '@nestjs/common';
import { TransactionLogsController } from './transaction-logs.controller';
import { TransactionLogsService } from './transaction-logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionLogs } from 'src/common/entities';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionLogs])],
  controllers: [TransactionLogsController],
  providers: [TransactionLogsService],
  exports: [TransactionLogsService],
})
export class TransactionLogsModule {}
