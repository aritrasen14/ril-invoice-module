import { SetMetadata } from '@nestjs/common';
import { USER_ROLES } from 'src/common/enums';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: USER_ROLES[]) => SetMetadata(ROLES_KEY, roles);
