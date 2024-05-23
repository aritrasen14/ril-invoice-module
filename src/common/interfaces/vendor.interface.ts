import { BaseModel } from './base_model.interface';

export interface IVendor extends BaseModel {
  vendor_name: string;
  email: string;
  role: string;
  is_verified?: boolean;
  country_code: string;
  vendor_code: string;
  user_role_des?: string;
  user_role_code?: string;
}
