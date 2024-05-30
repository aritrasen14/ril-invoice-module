import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

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
}
