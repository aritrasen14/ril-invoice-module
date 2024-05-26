import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import appConfig from '../app.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const jwtConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: () => {
    return {
      secret: appConfig().appSecret,
      signOptions: {
        expiresIn: '1d',
      },
    };
  },
  inject: [ConfigService],
};
