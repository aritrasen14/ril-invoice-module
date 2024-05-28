import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionLogs } from 'src/common/entities';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class TransactionLogsService {
  private readonly logger = new Logger(TransactionLogsService.name);

  constructor(
    @InjectRepository(TransactionLogs)
    private readonly transactionLogsRepo: Repository<TransactionLogs>,
  ) {}

  // * create transaction-logs
  async createTransactionLogs(invoiceLog: any, queryRunner: QueryRunner) {
    this.logger.debug('Inside createTransactionLogs');
    await queryRunner.manager.save(TransactionLogs, invoiceLog);
  }
}
