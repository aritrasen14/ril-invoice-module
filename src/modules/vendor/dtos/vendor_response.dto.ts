import { ApiResponseProperty } from '@nestjs/swagger';
import { EntityResponseDto } from 'src/common/dtos';
import { Vendor } from 'src/common/entities';
import {
  ICountry,
  IUser,
  IUserRoles,
  IVendor,
  IVendorTypes,
} from 'src/common/interfaces';

// * Response DTO for Vendor
export class VendorResponseDto
  extends EntityResponseDto
  implements IVendor, IUserRoles, ICountry, IVendorTypes, IUser
{
  constructor(vendor: Vendor) {
    super();
    this.id = vendor.id;
    this.created_at = vendor.created_at;
    this.updated_at = vendor.updated_at;
    this.is_active = vendor.is_active;
    this.vendor_name = vendor.vendor_name;
    this.email = vendor.email;
    this.vendor_code = vendor.vendor_code;

    // *  Values Coming from UserRoles
    this.user_role_des = vendor.user_role?.user_role_des || null;
    this.user_role_code = vendor.user_role?.user_role_code || null;

    // * Values coming from country_codes
    this.country_code = vendor.country?.country_code || null;
    this.country_name = vendor.country?.country_name || null;

    // * Values coming from vendor_types
    this.vendor_type_code = vendor.vendor_type?.vendor_type_code || null;
    this.vendor_type_des = vendor.vendor_type?.vendor_type_des || null;

    // * Values coming from user
  }

  @ApiResponseProperty({
    example: 'john',
  })
  readonly vendor_name: string;

  @ApiResponseProperty({
    example: 'john@email.com',
  })
  readonly email: string;

  @ApiResponseProperty({
    example: 'V',
  })
  readonly role: string;

  @ApiResponseProperty({
    example: '34567',
  })
  readonly vendor_code: string;

  @ApiResponseProperty({
    example: 'VENDOR',
  })
  readonly user_role_des?: string;

  @ApiResponseProperty({
    example: 'V',
  })
  readonly user_role_code?: string;

  @ApiResponseProperty({
    example: 'IND',
  })
  readonly country_code?: string;

  @ApiResponseProperty({
    example: 'INDIA',
  })
  readonly country_name?: string;

  @ApiResponseProperty({
    example: 'IT',
  })
  readonly vendor_type_code: string;

  @ApiResponseProperty({
    example: 'IT',
  })
  readonly vendor_type_des: string;
}
