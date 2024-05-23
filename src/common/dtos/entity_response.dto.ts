import { ApiResponseProperty } from '@nestjs/swagger';

export class EntityResponseDto {
  @ApiResponseProperty({
    example: 'cb9f2c82-2910-4766-a634-54502dfb01e1',
    format: 'v4',
  })
  public id: string;

  @ApiResponseProperty()
  public created_at: Date;

  @ApiResponseProperty()
  public updated_at: Date;

  @ApiResponseProperty()
  public is_active: boolean;
}
