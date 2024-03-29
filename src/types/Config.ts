import { ConnectionOptions } from "typeorm";

export interface ConfigBackend {
  api_port: number;
  secret: string;
  token_expiry: string;
}

export interface ConfigCore {
  host: string;
  log_level: string;
  socket_port: number;
}

export default interface Config {
  backend: ConfigBackend;
  core: ConfigCore;
  database: ConnectionOptions;
  services_directory: string;
  token: string;
}
