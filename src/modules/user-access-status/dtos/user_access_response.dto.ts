import { ApiResponseProperty } from '@nestjs/swagger';
import { EntityResponseDto } from 'src/common/dtos';
import { UserAccessStatus } from 'src/common/entities';
import { IInvoiceStatus, IUserRoles } from 'src/common/interfaces';

export class UserAccessStatusResponseDto
  extends EntityResponseDto
  implements IInvoiceStatus, IUserRoles
{
  constructor(userAccessStatus: UserAccessStatus) {
    super();
    this.id = userAccessStatus.id;
    this.created_at = userAccessStatus.created_at;
    this.updated_at = userAccessStatus.updated_at;

    // *  Values Coming from UserRoles
    this.user_role_des = userAccessStatus.user_role?.user_role_des || null;
    this.user_role_code = userAccessStatus.user_role?.user_role_code || null;

    // * values coming from invoice-status
    this.invoice_sts_code =
      userAccessStatus.invoice_status?.invoice_sts_code || null;
    this.invoice_sts_des =
      userAccessStatus.invoice_status?.invoice_sts_des || null;
  }

  @ApiResponseProperty({
    example: 'STS',
  })
  readonly invoice_sts_code: string;

  @ApiResponseProperty({
    example: 'ST SUBMITTED',
  })
  readonly invoice_sts_des: string;

  @ApiResponseProperty({
    example: 'VENDOR',
  })
  readonly user_role_des?: string;

  @ApiResponseProperty({
    example: 'V',
  })
  readonly user_role_code?: string;
}
