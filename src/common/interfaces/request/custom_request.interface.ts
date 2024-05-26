import { Request } from 'express';
import { User } from 'src/common/entities';

export interface CustomUserRequest extends Request {
  user: {
    id: string;
  };
}

export interface CustomLoginRequest extends Request {
  user: User;
}
