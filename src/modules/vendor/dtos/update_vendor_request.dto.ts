import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

// * Update request DTO for Vendor
export class UpdateVendorRequestDto {
  @ApiPropertyOptional({
    type: String,
    required: false,
    description: 'vendor_name',
    example: 'john',
  })
  @IsOptional()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  vendor_name: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    description: 'vendor_email',
    example: 'john@email.com',
  })
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    description: 'vendor user_role_id',
    example: 'b652b2ca-5732-410c-ac5b-7e157846ad67',
  })
  @IsOptional()
  @IsDefined()
  @IsUUID()
  user_role_id: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    description: 'vendor_country_code',
    example: 'aff32e80-170f-4857-99af-1d2931d7f341',
  })
  @IsOptional()
  @IsDefined()
  @IsUUID()
  country_code_id: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: '5aab488f-0e34-405b-8328-877599733fa3',
    description: 'vendor type_code',
  })
  @IsOptional()
  @IsDefined()
  @IsUUID()
  vendor_type_id: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: '1234',
    description: 'vendor_code',
  })
  @IsOptional()
  @IsDefined()
  @IsUUID()
  vendor_code: string;
}
