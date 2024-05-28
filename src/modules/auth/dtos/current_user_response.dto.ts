import { ApiResponseProperty } from '@nestjs/swagger';
import { USER_ROLES } from 'src/common/enums';

export class CurrentUserResponse {
  @ApiResponseProperty({
    example: 'ca96f33e-f679-4a18-88b0-6d892cca58e9',
  })
  id: string;

  @ApiResponseProperty({
    example: 'ca96f33e-f679-4a18-88b0-6d892cca58e9',
  })
  user_role_code: USER_ROLES;
}
