import { ApiResponseProperty } from '@nestjs/swagger';

export class EntityResponseDto {
  @ApiResponseProperty({
    example: 'cb9f2c82-2910-4766-a634-54502dfb01e1',
    format: 'v4',
  })
  id: string;

  @ApiResponseProperty()
  created_at: Date;

  @ApiResponseProperty()
  updated_at: Date;

  @ApiResponseProperty()
  is_active: boolean;
}
