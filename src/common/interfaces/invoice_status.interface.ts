import { BaseModel } from './base_model.interface';

export interface IInvoiceStatus extends BaseModel {
  invoice_sts_code?: string;
  invoice_sts_des?: string;
}
