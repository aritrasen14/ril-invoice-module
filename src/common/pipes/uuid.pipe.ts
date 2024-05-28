import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class UUIDValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): string {
    const { data: isKeyGiven } = metadata;

    if (!isKeyGiven) {
      value = value['id'];
    }

    if (!isUUID(value)) {
      throw new BadRequestException(`${value} is not a uuid`);
    }
    return value;
  }
}
