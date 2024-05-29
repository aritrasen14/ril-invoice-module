import { ApiResponseProperty } from '@nestjs/swagger';

export class UploadResponse {
  @ApiResponseProperty({
    example: 'https://www.example.com',
  })
  url: string;
}
