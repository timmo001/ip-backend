import { compare } from 'bcrypt';

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
