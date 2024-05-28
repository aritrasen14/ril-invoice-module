import { BaseModel } from './base_model.interface';

export interface IProject extends BaseModel {
  project_name?: string;
  project_code?: string;
}
