import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';

// * Create request DTO for User
export class CreateUserDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'User Email!',
    example: 'john@email.com',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'User password!',
    example: 'Test@1234',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'vendor user_role_id',
    example: 'b652b2ca-5732-410c-ac5b-7e157846ad67',
  })
  @IsDefined()
  @IsUUID()
  user_role_id: string;
}
