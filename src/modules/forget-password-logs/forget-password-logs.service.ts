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
    this.logger.debug('Inside createdForgetPasswordLog');
    const forgetPasswordLog = await this.forgetPasswordLogsRepo.save({
      user_id: userId,
      status: FORGET_PASSWORD_STATUS.STATUS_INITIATED,
      expired_time: new Date(Date.now() + 10 * 60 * 1000), // * Adding 10 mins
    });

    if (!forgetPasswordLog) {
      throw new BadRequestException(
        'Error while creating forget-password-logs!',
      );
    }

    return forgetPasswordLog;
  }

  async checkIfAlreadyRequestedForForgetPassword(userId: string) {
    this.logger.debug('Inside checkIfAlreadyRequestedForForgetPassword');
    const existingLog = await this.forgetPasswordLogsRepo.findOne({
      where: {
        user_id: userId,
        status: FORGET_PASSWORD_STATUS.STATUS_INITIATED,
      },
      order: { expired_time: 'DESC' },
    });

    if (existingLog) {
      const currentTime = new Date().getTime();
      const expiredLoggedTime = existingLog.expired_time.getTime();

      if (expiredLoggedTime > currentTime) {
        throw new BadRequestException(
          'Forget password request sent already. Please try again after some time!',
        );
      }

      // * Delete Log from table
      await this.deleteForgetPasswordLog(existingLog.id);
    }
  }

  async deleteForgetPasswordLog(id: string) {
    this.logger.debug('Inside deleteForgetPasswordLog');
    const deletedLog = await this.forgetPasswordLogsRepo.delete(id);

    if (!deletedLog || deletedLog.affected === 0) {
      throw new BadRequestException(
        'Error while deleting forget password log from table!',
      );
    }
    return deletedLog;
  }

  async changeStatusFromInitiated(id: string) {
    this.logger.debug('Inside changeStatus');
    const forgetPasswordLog = await this.forgetPasswordLogsRepo.findOne({
      where: { id },
    });

    if (forgetPasswordLog.status === FORGET_PASSWORD_STATUS.STATUS_INITIATED) {
      throw new BadRequestException('Status still initiated!');
    }

    const updatedLog = await this.forgetPasswordLogsRepo.update(id, {
      status: FORGET_PASSWORD_STATUS.STATUS_COMPLETED,
    });

    if (!updatedLog || updatedLog.affected === 0) {
      throw new BadRequestException(
        'Error while deleting forget password log from table!',
      );
    }
    return updatedLog;
  }

  async findLogByIdAndStatus(id: string, status: FORGET_PASSWORD_STATUS) {
    return this.forgetPasswordLogsRepo.findOne({
      where: { id, status },
    });
  }
}
