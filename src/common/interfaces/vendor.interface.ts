import { BaseModel } from './base_model.interface';

export interface IVendor extends BaseModel {
  vendor_name: string;
  email: string;
  is_verified?: boolean;
  vendor_code: string;

  // *  Values Coming from UserRoles
  user_role_des?: string;
  user_role_code?: string;

  // * Values coming from country_codes
  country_code?: string;
  country_name?: string;

  // * Values coming from vendor_types
  vendor_type_code?: string;
  vendor_type_des?: string;
}
