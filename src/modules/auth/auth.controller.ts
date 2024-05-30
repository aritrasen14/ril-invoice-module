import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {
  LoginDto,
  LoginResponseDto,
  ForgetPasswordRequestDto,
  ForgetPasswordResponseDto,
} from './dtos';
import { UserResponseDto } from '../user/dtos/user_response.dto';
import { UUIDValidationPipe } from 'src/Common/pipes';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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
  ): Promise<{ access_token: string; user: UserResponseDto }> {
    this.logger.debug('Inside login');
    const accessToke = this.authService.generateToken(req.user);
    return { access_token: accessToke, user: req.user };
  }

  // * Forget password Api
  @Post('/forget-password')
  @ApiOperation({
    summary: 'Forget Password user!',
    operationId: 'forgetPassword',
  })
  @ApiOkResponse({
    description: 'Password changed email sent successfully!',
    type: ForgetPasswordResponseDto,
  })
  async forgetPassword(@Body() body: ForgetPasswordRequestDto) {
    return this.authService.forgetPassword(body);
  }

  // * Reset password Api
  @UseGuards(JwtAuthGuard)
  @Get('/reset-password/:token')
  @ApiOperation({
    summary: 'Forget Password user!',
    operationId: 'forgetPassword',
  })
  @ApiOkResponse({
    description: 'OTP sent successfully!',
    type: ForgetPasswordResponseDto,
  })
  async resetPassword(@Param('token') token: string) {
    // return this.authService.resetPassword();
  }
}
