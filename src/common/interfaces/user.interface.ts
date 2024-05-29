import { BaseModel } from './base_model.interface';

export interface IUser extends BaseModel {
  email?: string;
  password?: string;
  otp?: number;
  otp_creation_dt?: Date;
}
