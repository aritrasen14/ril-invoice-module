import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from '../user/dtos/user_response.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { ForgetPasswordRequestDto } from './dtos';
import { ForgetPasswordLogsService } from '../forget-password-logs/forget-password-logs.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly forgetPasswordLogsService: ForgetPasswordLogsService,
  ) {}

  async validateUserCreds(email: string, password: string): Promise<any> {
    this.logger.debug('Inside validateUserCreds');
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('No user found with this email!');
    }

    const passwordIsMatch = await bcrypt.compare(password, user.password);

    if (!passwordIsMatch) {
      throw new UnauthorizedException('Incorrect password!');
    }

    return user;
  }

  generateToken(user: UserResponseDto): string {
    this.logger.debug('Inside generateToken');
    return this.jwtService.sign({
      id: user.id,
      user_role_code: user.user_role_code,
    });
  }

  async forgetPassword(body: ForgetPasswordRequestDto) {
    const { email } = body;

    const existingUser = await this.userService.getUserByEmail(email);

    // START A TRANSACTION HERE

    const recordedForgetPasswordLog =
      await this.forgetPasswordLogsService.createdForgetPasswordLog(
        existingUser.id,
      );

    const generatedToken = this.jwtService.sign({
      id: existingUser.id,
      user_role_code: existingUser.user_role_code,
      email: existingUser.email,
      forgetPasswordId: recordedForgetPasswordLog.id,
    });

    const SENT_EMAIL_LINK = `http://localhost:${this.configService.get<string>('PORT')}/reset-password/${generatedToken}`;

    const updatePasswordMailOptions = {
      to: this.configService.get<string>('ADMIN_EMAIL'),
      from: this.configService.get<string>('SUPPORT_EMAIL'),
      sender: 'invoice-module',
      subject: 'Forget Password Request',
      html: `<p>--------Link for reset-password - ${SENT_EMAIL_LINK}------------------</p>`,
    };

    const updatePasswordMail = await this.mailerService.sendMail(
      updatePasswordMailOptions,
    );

    if (!updatePasswordMail) {
      throw new BadRequestException(
        `Error while sending forget password request email!`,
      );
    }

    // COMMIT TRANSACTION HERE

    return { message: 'Forget password email sent successfully!' };
  }
}
