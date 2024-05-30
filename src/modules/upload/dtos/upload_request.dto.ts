import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadRequest {
  @ApiProperty({ required: true, example: 'test.jpg' })
  @IsString()
  @IsNotEmpty()
  filename: string;
}
