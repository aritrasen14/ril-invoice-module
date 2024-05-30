import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {
  LoginDto,
  LoginResponseDto,
  ForgetPasswordRequestDto,
  ForgetPasswordResponseDto,
  ResetPasswordResponseDto,
  ResetPasswordRequestDto,
  ForgetPasswordValidateResponse,
} from './dtos';
import { UserResponseDto } from '../user/dtos/user_response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UUIDValidationPipe } from 'src/Common/pipes';

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
  @Post('/reset-password/:token')
  @ApiOperation({
    summary: 'Reset Password user!',
    operationId: 'resetPassword',
  })
  @ApiOkResponse({
    description: 'Password reset successfully!',
    type: ResetPasswordResponseDto,
  })
  async resetPassword(
    @Req() req,
    @Param('token') token: string,
    @Body() body: ResetPasswordRequestDto,
  ) {
    return this.authService.resetPassword(req.user, token, body);
  }

  // * Forget password validation
  @Get('/:id')
  @ApiOperation({
    summary: 'Forget Password validation!',
    operationId: 'resetPasswordValidation',
  })
  @ApiConflictResponse({
    description: 'Link expired or already used!',
    type: ForgetPasswordValidateResponse,
  })
  async forgetPasswordValidation(
    @Param('id', UUIDValidationPipe) forgetPasswordId: string,
  ) {
    const isLinkValid =
      await this.authService.forgetPasswordValidation(forgetPasswordId);

    return { isValid: isLinkValid };
  }
}
