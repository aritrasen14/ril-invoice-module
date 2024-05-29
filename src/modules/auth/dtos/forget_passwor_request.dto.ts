import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class ForgetPasswordRequestDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Enter email!',
    example: 'aritra.sen@contenterra.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    description: 'Enter new password!',
    example: 'Test@12345',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  newPassword: string;

  @ApiPropertyOptional({
    type: Number,
    required: false,
    description: 'Enter the OTP sent to your email!',
    example: '123456',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  otp: number;
}
