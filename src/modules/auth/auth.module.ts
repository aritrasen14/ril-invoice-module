import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtConfig } from 'src/config/jwt/jwt.config';
import { UserModule } from '../user/user.module';
import { ForgetPasswordLogsModule } from '../forget-password-logs/forget-password-logs.module';

@Module({
  imports: [
    UserModule,
    ForgetPasswordLogsModule,
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
