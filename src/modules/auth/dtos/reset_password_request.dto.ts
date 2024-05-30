import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class ResetPasswordRequestDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Enter email!',
    example: 'aritra.sen@contenterra.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Enter password!',
    example: '12345',
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
