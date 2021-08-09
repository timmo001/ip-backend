import { compare } from "bcrypt";
import { join } from "path";
import { parse, stringify } from "yaml";
import { readFileSync, writeFileSync } from "fs";

import GenericObject from "../types/GenericObject";

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
    const d = readFileSync(path, { encoding: "utf8" });
    if (typeof d === "string") return parse(d);
  } catch (e) {}
  return null;
};

export const saveYAML = (path: string, data: GenericObject): any | null => {
  return writeFileSync(path, `---\n${stringify(data)}`, {
    encoding: "utf8",
  });
};

export function getAppDataDirectory() {
  return join(
    process.env.APP_PATH ||
      process.env.APPDATA ||
      (process.platform == "darwin"
        ? process.env.HOME + "/Library/Preferences"
        : process.env.HOME + "/.local/share"),
    "ip-data"
  );
}
