import { customAlphabet } from 'nanoid';

export const generateOTP = (size = 6): string => {
  return customAlphabet('0123456789', size)();
};
