import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
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
    description: 'vendor user_role_id',
    example: 'b652b2ca-5732-410c-ac5b-7e157846ad67',
  })
  @IsDefined()
  @IsUUID()
  user_role_id: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'vendor country_code',
    example: 'aff32e80-170f-4857-99af-1d2931d7f341',
  })
  @IsDefined()
  @IsUUID()
  country_code_id: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '5aab488f-0e34-405b-8328-877599733fa3',
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
