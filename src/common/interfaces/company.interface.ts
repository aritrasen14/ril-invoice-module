import { BaseModel } from './base_model.interface';

export interface ICompany extends BaseModel {
  company_code?: string;
  company_name?: string;
}
