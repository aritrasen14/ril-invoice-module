import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForgetPasswordLogs } from 'src/common/entities';
import { FORGET_PASSWORD_STATUS } from 'src/common/enums';
import { Repository } from 'typeorm';

@Injectable()
export class ForgetPasswordLogsService {
  private readonly logger = new Logger(ForgetPasswordLogsService.name);

  constructor(
    @InjectRepository(ForgetPasswordLogs)
    private readonly forgetPasswordLogsRepo: Repository<ForgetPasswordLogs>,
  ) {}

  async createdForgetPasswordLog(userId: string) {
    const forgetPasswordLog = await this.forgetPasswordLogsRepo.save({
      user_id: userId,
      status: FORGET_PASSWORD_STATUS.STATUS_INITIATED,
      expired_time: new Date().getTime() + 15 * 60 * 1000,
    });

    if (!forgetPasswordLog) {
      throw new BadRequestException(
        'Error while creating forget-password-logs!',
      );
    }

    return forgetPasswordLog;
  }
}
