import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAccessStatus } from 'src/common/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserAccessStatusService {
  private readonly logger = new Logger(UserAccessStatusService.name);

  // * storing the relations in the property to reduce redundancy
  private readonly relations = ['user_role', 'invoice_status'];

  constructor(
    @InjectRepository(UserAccessStatus)
    private userAccessStatusRepo: Repository<UserAccessStatus>,
  ) {}

  async userAccessStatuses(user_role_id: string) {
    this.logger.debug('Inside userAccessStatuses');
    return await this.userAccessStatusRepo.find({
      where: { user_role_id: user_role_id },
      relations: this.relations,
    });
  }
}
