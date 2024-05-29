import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto, CurrentUserResponse, LoginResponseDto } from './dtos';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  // * Login Api
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: 'Login User',
    operationId: 'login',
  })
  @ApiOkResponse({
    description: 'Successfully logged in user!',
    type: LoginResponseDto,
  })
  async login(
    @Request() req,
    @Body() body: LoginDto,
  ): Promise<{ access_token: string }> {
    this.logger.debug('Inside login');
    return this.authService.generateToken(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  @ApiOperation({
    summary: 'Get Current User',
    operationId: 'getCurrentUser',
  })
  @ApiOkResponse({
    description: 'Successfully get current user details!',
    type: CurrentUserResponse,
  })
  async user(@Request() req): Promise<any> {
    this.logger.debug('Inside login', req.user);
    return req.user;
  }
}
