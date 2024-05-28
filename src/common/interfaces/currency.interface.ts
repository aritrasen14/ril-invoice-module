import { BaseModel } from './base_model.interface';

export interface ICurrency extends BaseModel {
  currency_code?: string;
  currency_des?: string;
}
