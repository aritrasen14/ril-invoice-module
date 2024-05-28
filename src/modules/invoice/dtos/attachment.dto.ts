import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AttachmentDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'attachment_type_id',
    example: '8a403b87-b64d-4648-a79d-1fbb62c081bb',
  })
  @IsDefined()
  @IsUUID()
  attachment_type_id: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'file_name',
    example: 'filename',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  file_name: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'file_path',
    example: 'www.example.com',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  file_path: string;
}
