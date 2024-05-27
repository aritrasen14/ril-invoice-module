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

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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

  generateToken(user: UserResponseDto): { access_token: string } {
    this.logger.debug('Inside generateToken');
    return {
      access_token: this.jwtService.sign({
        id: user.id,
        user_role_code: user.user_role_code,
      }),
    };
  }
}
