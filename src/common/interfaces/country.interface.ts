import { BaseModel } from './base_model.interface';

export interface ICountry extends BaseModel {
  country_code?: string;
  country_name?: string;
}
