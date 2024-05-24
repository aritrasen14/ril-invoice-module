import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentTypes } from '../../common/entities';

@Module({
  imports: [TypeOrmModule.forFeature([AttachmentTypes])],
  controllers: [],
  providers: [],
  exports: [],
})
export class AttachmentTypesModule {}
