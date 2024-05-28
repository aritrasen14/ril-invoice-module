import { BaseModel } from './base_model.interface';

export interface IInvoiceTypes extends BaseModel {
  invoice_type_code?: string;
  invoice_type_des?: string;
}
