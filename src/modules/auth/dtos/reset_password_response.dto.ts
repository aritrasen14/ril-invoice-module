import { ApiResponseProperty } from '@nestjs/swagger';
import { CurrentUserResponse } from './current_user_response.dto';

export class ResetPasswordResponseDto {
  @ApiResponseProperty({ example: 'User password updated successfully!' })
  message: string;

  @ApiResponseProperty({
    example: {
      id: 'ca96f33e-f679-4a18-88b0-6d892cca58e9',
      created_at: '2024-05-26T11:34:01.653Z',
      updated_at: '2024-05-26T11:34:01.653Z',
      is_active: true,
      email: 'john@email.com',
      password: '$2b$10$sytzhK8yIbxjdbHffoah8e6uur..eG11PZbJMQTa.YRVNwFuYvfTS',
      is_verified: false,
      otp: null,
      otp_creation_dt: '2024-05-29T09:10:57.492Z',
      user_role_des: 'VENDOR',
      user_role_code: 'V',
    },
  })
  readonly user: CurrentUserResponse;
}
