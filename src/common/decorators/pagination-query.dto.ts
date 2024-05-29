import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class PaginationQuery {
  @ApiPropertyOptional({ required: false, default: 1 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ required: false, default: 10 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number = 10;
}
