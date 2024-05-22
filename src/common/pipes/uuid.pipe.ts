import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IsUUID, validate } from 'class-validator';

@Injectable()
export class UUIDValidationPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(`${metadata.data} is required`);
    }

    const object = plainToClass(UUIDParamDto, { [metadata.data]: value });
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException('Invalid UUID!');
    }

    return value;
  }
}

class UUIDParamDto {
  @IsUUID('4', { message: 'The ID must be a valid UUID v4' })
  id: string;
}
