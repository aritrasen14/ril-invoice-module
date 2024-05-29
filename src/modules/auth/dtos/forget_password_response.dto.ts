import { ApiResponseProperty } from '@nestjs/swagger';

export class ForgetPasswordResponseDto {
  @ApiResponseProperty({ example: 'User password updated successfully!' })
  message: string;
}
