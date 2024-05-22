import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { VendorModule } from './Modules/vendor/vendor.module';
import { TypeOrmSharedModule } from './common/db/typeorm.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './common/filters';

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
