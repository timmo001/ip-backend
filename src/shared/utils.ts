import { compare } from 'bcrypt';
import * as fs from 'fs';
import * as YAML from 'yaml';

export const toPromise = <T>(data: T): Promise<T> => {
  return new Promise<T>((resolve) => {
    resolve(data);
  });
};

export const comparePasswords = async (
  userPassword: string,
  currentPassword: string
): Promise<boolean> => {
  return await compare(currentPassword, userPassword);
};

export const readYAML = (path: string): any | null => {
  const d = fs.readFileSync(path, { encoding: 'utf8' });
  if (typeof d === 'string') return YAML.parse(d);
  return null;
};
