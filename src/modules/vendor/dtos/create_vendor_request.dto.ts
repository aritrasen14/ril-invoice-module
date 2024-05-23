import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

// * Create request DTO for Vendor
export class CreateVendorRequestDto {
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

  @ApiProperty({
    type: String,
    required: true,
    example: 'IT',
    description: 'vendor type_code',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  vendor_type_code: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '1234',
    description: 'vendor type_code',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  vendor_code: string;
}
