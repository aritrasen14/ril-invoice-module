import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUUID,
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
    description: 'vendor user_role_id',
    example: 'd42c15ee-7eef-4656-b777-d4e3b615945c',
  })
  @IsDefined()
  @IsUUID()
  user_role_id: string;

  @ApiProperty({
    required: true,
    description: 'vendor country_code',
    example: '29c665e2-55ab-4d1a-aca2-11b4ca7b3183',
  })
  @IsDefined()
  @IsUUID()
  country_code_id: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '574b5a02-fa68-406f-9efe-e186724fa0a2',
    description: 'vendor type_code',
  })
  @IsDefined()
  @IsUUID()
  vendor_type_id: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '1234',
    description: 'vendor_code',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  vendor_code: string;
}
