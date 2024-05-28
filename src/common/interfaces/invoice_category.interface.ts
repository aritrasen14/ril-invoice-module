import { BaseModel } from './base_model.interface';

export interface IInvoiceCategory extends BaseModel {
  invoice_category_code?: string;
  invoice_category_des?: string;
}
