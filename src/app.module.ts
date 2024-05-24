import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { VendorModule } from './Modules/vendor/vendor.module';
import { TypeOrmSharedModule } from './common/db/typeorm.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './common/filters';
import { InvoiceDetailsModule } from './modules/invoice_details/invoice_details.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { InvoiceHeaderModule } from './modules/invoice_header/invoice_header.module';
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
    InvoiceHeaderModule,
    InvoiceDetailsModule,
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
