import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VendorModule } from './Modules/vendor/vendor.module';
import { typeOrmAsyncConfig } from './config/db/typeorm.config';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './common/filters';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { UserRoleModule } from './modules/user-roles/user_roles.module';
import { AttachmentModule } from './modules/attachment/attachment.module';
import { MasterModule } from './Modules/master/master.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserAccessStatusModule } from './modules/user-access-status/user-access-status.module';
import { TransactionLogsModule } from './modules/transaction-logs/transaction-logs.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    // * Import Config Module
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    // * Import MailerModule
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: configService.get<string>('EMAIL_USERID'),
            pass: configService.get<string>('EMAIL_PWD'),
          },
        },
        // template: {
        //   dir: join(__dirname, '/common/templates'),
        //   adapter: new ReactAdapter(),
        // },
      }),
      inject: [ConfigService],
    }),

    // * Import TypeORM Module
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),

    // * Import Custom Modules
    AuthModule,
    UserModule,
    MasterModule,
    InvoiceModule,
    UserRoleModule,
    VendorModule,
    AttachmentModule,
    UserAccessStatusModule,
    TransactionLogsModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}
