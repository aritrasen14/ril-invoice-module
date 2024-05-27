import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create_user_request.dto';
import { UserResponseDto } from './dtos/user_response.dto';
import { Roles } from '../auth/roles.decorator';
import { USER_ROLES } from 'src/common/enums';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post('/')
  @Roles(
    USER_ROLES.INVOICE_VALIDATION_TEAM,
    USER_ROLES.SCROLL_TEAM,
    USER_ROLES.FINANCE_AND_ACCOUNTS_TEAM,
  )
  @UseGuards(RolesGuard)
  @ApiOperation({
    summary: 'Register User',
    operationId: 'registerUser',
  })
  @ApiCreatedResponse({
    description: '',
    type: UserResponseDto,
  })
  async registerUser(@Body() body: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.registerUser(body);
  }
}
