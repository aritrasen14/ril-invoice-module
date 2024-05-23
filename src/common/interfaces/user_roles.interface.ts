import { BaseModel } from './base_model.interface';

export interface IUserRoles extends BaseModel {
  user_role_des: string;
  user_role_code: string;
}
