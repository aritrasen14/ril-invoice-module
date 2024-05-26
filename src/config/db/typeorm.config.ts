import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'postgres',
    host: configService.get<string>('POSTGRES_HOST'),
    port: +configService.get<string>('POSTGRES_PORT'),
    username: configService.get<string>('POSTGRES_USERNAME'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_DATABASE'),
    schema: configService.get<string>('POSTGRES_DATABASE_SCHEMA'),
    // entities: [
    // __dirname + '/**/*.entity{.ts,.js}'
    // ],
    autoLoadEntities: true,
    synchronize: true,
    migrations: [],
    logging: ['error', 'info', 'log', 'query', 'schema', 'warn', 'migration'],
  }),
  inject: [ConfigService],
};
