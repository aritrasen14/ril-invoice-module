import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { VendorModule } from './Modules/vendor/vendor.module';
import { TypeOrmSharedModule } from './common/config/db/typeorm.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './common/filters';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { UserRoleModule } from './modules/user-roles/user_roles.module';

@Module({
  imports: [
    // * Import Config Module
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    // * Import TypeORM Module
    TypeOrmSharedModule,

    // * Import Custom Modules
    InvoiceModule,
    UserRoleModule,
    VendorModule,
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
