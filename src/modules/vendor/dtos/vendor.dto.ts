import {
  ApiProperty,
  ApiPropertyOptional,
  ApiResponseProperty,
} from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

// * Create request DTO for Vendor
export class CreateVendorDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'vendor_name',
    example: 'john',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  vendor_name: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'vendor_email',
    example: 'john@email.com',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'vendor_password',
    example: 'John@1234',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'vendor_role',
    example: 'V',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty({
    description: 'vendor_country_code',
    example: 'IND',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  country_code: string;
}

// * Update request DTO for Vendor
export class UpdateVendorDto {
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

// * Response DTO for Vendor
export class CreateVendorResponseDto {
  @ApiResponseProperty({
    example: 'john',
  })
  public vendor_name: string;

  @ApiResponseProperty({
    example: 'john@email.com',
  })
  public email: string;

  @ApiResponseProperty({
    example: 'IND',
  })
  public country_code: string;

  @ApiResponseProperty({
    example: 'cb9f2c82-2910-4766-a634-54502dfb01e1',
    format: 'v4',
  })
  public id: string;

  @ApiResponseProperty()
  public created_at: Date;

  @ApiResponseProperty()
  public updated_at: Date;
}
