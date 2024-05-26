import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create_user_request.dto';
import { UserResponseDto } from './dtos/user_response.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post('/')
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
