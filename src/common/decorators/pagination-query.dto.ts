import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsUUID } from 'class-validator';

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

  @ApiPropertyOptional({
    required: false,
    example: '0874a355-495a-4a17-a54e-1cc87ad714b0',
  })
  @IsOptional()
  @IsUUID()
  invoiceStatusId?: string = '0874a355-495a-4a17-a54e-1cc87ad714b0';
}
