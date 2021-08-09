import { compare } from 'bcrypt';
import * as fs from 'fs';
import { join } from 'path';
import * as YAML from 'yaml';

import GenericObject from '../types/GenericObject';

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
  try {
    const d = fs.readFileSync(path, { encoding: 'utf8' });
    if (typeof d === 'string') return YAML.parse(d);
  } catch (e) {}
  return null;
};

export const saveYAML = (path: string, data: GenericObject): any | null => {
  return fs.writeFileSync(path, `---\n${YAML.stringify(data)}`, {
    encoding: 'utf8',
  });
};

export function getAppDataDirectory() {
  return join(
    process.env.APP_PATH ||
      process.env.APPDATA ||
      (process.platform == 'darwin'
        ? process.env.HOME + '/Library/Preferences'
        : process.env.HOME + '/.local/share'),
    'ip'
  );
}
