import { ApiResponseProperty } from '@nestjs/swagger';

export class ForgetPasswordValidateResponse {
  @ApiResponseProperty({
    example: false,
  })
  readonly isValid: boolean;
}
