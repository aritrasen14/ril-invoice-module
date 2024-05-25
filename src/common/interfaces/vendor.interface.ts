import { BaseModel } from './base_model.interface';

export interface IVendor extends BaseModel {
  vendor_name?: string;
  email?: string;
  is_verified?: boolean;
  vendor_code?: string;
}
