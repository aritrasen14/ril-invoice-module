import { Controller, Get, Logger, Param, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { USER_ROLES } from 'src/common/enums';
import { Roles } from '../auth/roles.decorator';
import { UUIDValidationPipe } from 'src/Common/pipes';
import { UserAccessStatusService } from './user-access-status.service';

@ApiTags('user-access')
@Controller('user-access-status')
export class UserAccessStatusController {
  private readonly logger = new Logger(UserAccessStatusController.name);

  constructor(
    private readonly userAccessStatusService: UserAccessStatusService,
  ) {}

  // * Fetch Access Statuses
  @Get('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    USER_ROLES.FINANCE_AND_ACCOUNTS_TEAM,
    USER_ROLES.INVOICE_VALIDATION_TEAM,
    USER_ROLES.SCROLL_TEAM,
    USER_ROLES.VENDOR,
  )
  @ApiOperation({
    summary: 'Fetch access statuses',
    operationId: 'fetchAccessStatues',
  })
  @ApiResponse({
    description: 'Successfully fetched access statues!',
    // type: [],
  })
  async fetchAccessStatues(
    @Param('id', UUIDValidationPipe) userRoleId: string,
  ) {
    this.logger.debug('Inside fetchAccessStatues');
    return await this.userAccessStatusService.userAccessStatuses(userRoleId);
  }
}
