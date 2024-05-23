import { ApiResponseProperty } from '@nestjs/swagger';
import { EntityResponseDto } from 'src/common/dtos';
import { Vendor } from 'src/common/entities';
import { IVendor } from 'src/common/interfaces';

// * Response DTO for Vendor
export class VendorResponseDto extends EntityResponseDto implements IVendor {
  constructor(vendor: Vendor) {
    super();
    this.vendor_name = vendor.vendor_name;
    this.email = vendor.email;
    this.role = vendor.role;
    this.country_code = vendor.country_code;
    this.vendor_type_code = vendor.vendor_type_code;
    this.vendor_code = vendor.vendor_code;
    this.user_role_code = vendor.user_role.user_role_code;
    this.user_role_des = vendor.user_role.user_role_des;
  }

  @ApiResponseProperty({
    example: 'john',
  })
  public vendor_name: string;

  @ApiResponseProperty({
    example: 'john@email.com',
  })
  public email: string;

  @ApiResponseProperty({
    example: 'V',
  })
  public role: string;

  @ApiResponseProperty({
    example: 'IND',
  })
  public country_code: string;

  @ApiResponseProperty({
    example: 'IT',
  })
  public vendor_type_code: string;

  @ApiResponseProperty({
    example: '34567',
  })
  public vendor_code: string;

  @ApiResponseProperty({
    example: 'VENDOR',
  })
  public user_role_des: string;

  @ApiResponseProperty({
    example: 'V',
  })
  public user_role_code: string;
}
