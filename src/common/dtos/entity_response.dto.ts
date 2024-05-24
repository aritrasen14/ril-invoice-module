import { ApiResponseProperty } from '@nestjs/swagger';

export class EntityResponseDto {
  @ApiResponseProperty({
    example: 'cb9f2c82-2910-4766-a634-54502dfb01e1',
    format: 'v4',
  })
  readonly id: string;

  @ApiResponseProperty()
  readonly created_at: Date;

  @ApiResponseProperty()
  readonly updated_at: Date;

  @ApiResponseProperty()
  readonly is_active: boolean;
}
