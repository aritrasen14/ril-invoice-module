import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attachment } from 'src/common/entities';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachmentRepo: Repository<Attachment>,
  ) {}

  async createAttachment(attachment, queryRunner: QueryRunner) {
    const savedAttachment = await queryRunner.manager.save(
      Attachment,
      attachment,
    );

    if (!savedAttachment) {
      throw new BadRequestException('Error while saving attachment!');
    }
    return savedAttachment;
  }
}
