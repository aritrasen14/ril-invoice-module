import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: +configService.get<string>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USERNAME'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        // entities: [
        // __dirname + '/**/*.entity{.ts,.js}'
        // ],
        autoLoadEntities: true,
        synchronize: true,
        logging: [
          'error',
          'info',
          'log',
          'query',
          'schema',
          'warn',
          'migration',
        ],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class TypeOrmSharedModule {}
