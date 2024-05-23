import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

// * Update request DTO for Vendor
export class UpdateVendorRequestDto {
  @ApiPropertyOptional({
    description: 'vendor_name',
    example: 'john',
    required: false,
  })
  @IsOptional()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  vendor_name: string;

  @ApiPropertyOptional({
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
    description: 'vendor_password',
    example: 'John@1234',
  })
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    description: 'vendor_role',
    example: 'V',
  })
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiPropertyOptional({
    description: 'vendor_country_code',
    example: 'IND',
  })
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  country_code: string;
}
