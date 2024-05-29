import { ApiResponseProperty } from '@nestjs/swagger';
import { EntityResponseDto } from 'src/common/dtos';
import { User } from 'src/common/entities';
import { IUser, IUserRoles } from 'src/common/interfaces';

// * Response DTO for User
export class UserResponseDto
  extends EntityResponseDto
  implements IUserRoles, IUser
{
  constructor(user: User) {
    super();
    this.id = user.id;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
    this.is_active = user.is_active;

    this.email = user.email;
    this.password = user.password;
    this.is_verified = user.is_verified;
    this.otp = user.otp;
    this.otp_creation_dt = user.otp_creation_dt;

    // *  Values Coming from UserRoles
    this.user_role_des = user.user_role?.user_role_des || null;
    this.user_role_code = user.user_role?.user_role_code || null;
  }

  @ApiResponseProperty({
    example: 'test@email.com',
  })
  readonly email: string;

  @ApiResponseProperty({
    example: '$2a$12$4vOrcrWE6L42OmEC2/y5WuBGg/sCHPjFMBvLdfO5kAsL5lLAFJV3u',
  })
  readonly password: string;

  @ApiResponseProperty({
    example: false,
  })
  readonly is_verified: boolean;

  @ApiResponseProperty({
    example: 'VENDOR',
  })
  readonly user_role_des?: string;

  @ApiResponseProperty({
    example: 'V',
  })
  readonly user_role_code?: string;

  @ApiResponseProperty({
    example: 1234,
  })
  readonly otp?: number;

  @ApiResponseProperty()
  readonly otp_creation_dt?: Date;
}
