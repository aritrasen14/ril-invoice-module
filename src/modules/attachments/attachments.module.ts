import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from '../../common/entities';
import { MasterModule } from '../master/master.module';

@Module({
  imports: [TypeOrmModule.forFeature([Attachment]), MasterModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AttachmentModule {}
