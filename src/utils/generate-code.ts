import { v4 as uuid } from 'uuid';
export const generateCode = (): string => {
  return uuid().replace(/-/g, '');
};
