import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from '../user/dtos/user_response.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { ForgetPasswordRequestDto, ResetPasswordRequestDto } from './dtos';
import { ForgetPasswordLogsService } from '../forget-password-logs/forget-password-logs.service';
import { FORGET_PASSWORD_STATUS } from 'src/common/enums';

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
    this.logger.debug('Inside forgetPassword');
    const { email } = body;

    const existingUser = await this.userService.getUserByEmail(email);

    // TODO START A TRANSACTION HERE

    // * check if already requested for Forget-Password
    await this.forgetPasswordLogsService.checkIfAlreadyRequestedForForgetPassword(
      existingUser.id,
    );

    const recordedForgetPasswordLog =
      await this.forgetPasswordLogsService.createdForgetPasswordLog(
        existingUser.id,
      );

    const generatedToken = this.jwtService.sign(
      {
        id: existingUser.id,
        user_role_code: existingUser.user_role_code,
        email: existingUser.email,
        forgetPasswordId: recordedForgetPasswordLog.id,
      },
      {
        expiresIn: '10min',
      },
    );

    // * Generate the link
    const SENT_EMAIL_LINK = `http://localhost:${this.configService.get<string>('PORT')}/reset-password/${generatedToken}`;

    // * sent forget password email
    const updatePasswordMailOptions = {
      to: email,
      from: this.configService.get<string>('SUPPORT_EMAIL'),
      sender: 'invoice-module',
      subject: 'Forget Password Request',
      html: `<p>--------Link for reset-password - <a>${SENT_EMAIL_LINK}</a>------------------</p>`,
    };

    const updatePasswordMail = await this.mailerService.sendMail(
      updatePasswordMailOptions,
    );

    if (!updatePasswordMail) {
      throw new BadRequestException(
        `Error while sending forget password request email!`,
      );
    }

    //TODO  COMMIT TRANSACTION HERE

    return {
      message: 'Forget password email sent successfully!',
      token: generatedToken,
    };
  }

  async resetPassword(
    user: UserResponseDto,
    token: string,
    body: ResetPasswordRequestDto,
  ) {
    this.logger.debug('Inside resetPassword');

    const verifiedToken = await this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    if (!verifiedToken) {
      throw new UnauthorizedException('Invalid token or token expired!');
    }

    // * Check for whether the link is till valid
    const isForgetPasswordValidated = await this.forgetPasswordValidation(
      verifiedToken.forgetPasswordId,
    );

    if (!isForgetPasswordValidated) {
      throw new UnauthorizedException('Link expired or already used!');
    }

    const userEmail = body.email;
    if (verifiedToken.email !== userEmail) {
      throw new BadRequestException(
        'Provided wrong email in payload or used wrong token!',
      );
    }

    const checkForUserWithEmail =
      await this.userService.getUserByEmail(userEmail);

    if (!checkForUserWithEmail) {
      throw new NotFoundException('No user found with this email!');
    }

    const userId = user.id;
    const useNewPassword = body.password;
    const userForgetPasswordId = verifiedToken.forgetPasswordId;

    // * Hash new password
    const salt = await bcrypt.genSalt();
    const hashedNewPassword = await bcrypt.hash(useNewPassword, salt);

    // * Update user password
    const modifiedUserPassword = await this.userService.updateUser(userId, {
      password: hashedNewPassword,
    });

    if (!modifiedUserPassword) {
      throw new BadRequestException('Error while updating user password!');
    }

    // * change the log status from status_initiated to status_completed in forget_password_logs table
    const deletedForgetPasswordLog =
      await this.forgetPasswordLogsService.changeStatusFromInitiated(
        userForgetPasswordId,
      );

    if (!deletedForgetPasswordLog || deletedForgetPasswordLog.affected === 0) {
      throw new BadRequestException(
        'Error while deleting password log from table!',
      );
    }

    // * Sent Email
    const updatePasswordSuccessfulMailOptions = {
      to: userEmail,
      from: this.configService.get<string>('SUPPORT_EMAIL'),
      sender: 'invoice-module',
      subject: 'Forget Password Response',
      html: `<p>-------------Your password reset successfully-------------</p>`,
    };

    const updatePasswordMail = await this.mailerService.sendMail(
      updatePasswordSuccessfulMailOptions,
    );

    if (!updatePasswordMail) {
      throw new BadRequestException(
        `Error while sending forget password successful response email!`,
      );
    }

    return modifiedUserPassword;
  }

  // * forget-password validation
  async forgetPasswordValidation(id: string) {
    const initiatedLog =
      await this.forgetPasswordLogsService.findLogByIdAndStatus(
        id,
        FORGET_PASSWORD_STATUS.STATUS_INITIATED,
      );

    const completedLog =
      await this.forgetPasswordLogsService.findLogByIdAndStatus(
        id,
        FORGET_PASSWORD_STATUS.STATUS_COMPLETED,
      );

    if (initiatedLog) {
      const currentTime = new Date().getTime();
      const logExpiredTime = initiatedLog.expired_time.getTime();
      if (currentTime > logExpiredTime) {
        return false;
      }
    }

    if (completedLog) {
      return false;
    }

    return true;
  }
}
