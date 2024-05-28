import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attachment } from 'src/common/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachmentRepo: Repository<Attachment>,
  ) {}

  async createAttachment(attachment) {
    const newAttachment = this.attachmentRepo.create(attachment);

    const newlyGeneratedAttachment =
      await this.attachmentRepo.save(newAttachment);

    return newlyGeneratedAttachment;
  }
}
