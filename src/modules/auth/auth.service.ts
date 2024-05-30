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
import { generateOTP } from 'src/common/utils';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
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
    const { email, newPassword, otp } = body;

    const foundUser = await this.userService.getUserByEmail(email);

    if (!foundUser) {
      throw new UnauthorizedException('User Not Found!');
    }

    // * User Generating the otp
    if (!newPassword && !otp) {
      // * Generate 6 digit otp
      const generatedOTP = +generateOTP();

      if (foundUser.otp) {
        await this.otpExpirationCheck(foundUser);
      }

      // * Add the generated-otp inside user table
      const modifiedUser = await this.userService.updateUser(foundUser.id, {
        otp: generatedOTP,
        otp_creation_dt: new Date(),
      });

      if (!modifiedUser) {
        throw new BadRequestException(
          'Error while adding the otp to the user!',
        );
      }

      // * Send OTP to email
      const mailOptions = {
        to: this.configService.get<string>('ADMIN_EMAIL'),
        from: this.configService.get<string>('SUPPORT_EMAIL'),
        sender: 'invoice-module',
        subject: 'OTP For reset password!',
        // template: 'bulk_order_email',
        // context: { email },
        html: `<p>---OTP: ${generatedOTP}---</p>`,
      };
      const result = await this.mailerService.sendMail(mailOptions);

      if (!result) {
        throw new BadRequestException('Error while sending the otp email!');
      }

      return { message: 'OTP message sent successfully!' };
    } else if (newPassword && otp) {
      await this.otpExpirationCheck(foundUser, true);

      const userOtp = foundUser.otp;
      if (otp != userOtp) {
        throw new UnauthorizedException('Wrong OTP!');
      }

      const generatedSalt = await bcrypt.genSalt();
      const newHashedPassword = await bcrypt.hash(newPassword, generatedSalt);

      const updatedUser = await this.userService.updateUser(foundUser.id, {
        otp: null,
        password: newHashedPassword,
        otp_creation_dt: null,
      });

      if (!updatedUser) {
        throw new BadRequestException('Error while updating the new password!');
      }

      return { message: 'User password updated successfully!' };
    } else {
      throw new BadRequestException('Otp or newPassword id needed!');
    }
  }

  async otpExpirationCheck(
    user: UserResponseDto,
    isForVerifyOtp: boolean = false,
  ) {
    const otpCreationTime = user.otp_creation_dt;
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - otpCreationTime.getTime();

    const tenMinutesInMilliseconds = 10 * 60 * 1000; // 10 mins ---> 60000ms

    if (!isForVerifyOtp) {
      if (timeDifference < tenMinutesInMilliseconds) {
        throw new BadRequestException('Otp already sent, try after some time!');
      }
    } else {
      if (timeDifference > tenMinutesInMilliseconds) {
        throw new BadRequestException(
          `Otp expired! Try generating the otp after sometime!`,
        );
      }
    }
  }
}
