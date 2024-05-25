import { BaseModel } from './base_model.interface';

export interface IVendorTypes extends BaseModel {
  vendor_type_code?: string;
  vendor_type_des?: string;
}
