import { BaseModel } from './base_model.interface';

export interface IProjectType extends BaseModel {
  project_type_code?: string;
  project_type_des?: string;
}
