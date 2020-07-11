import { Injectable } from '@nestjs/common';

import { readYAML } from '../shared/utils';

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

export interface Config {
  backend: ConfigBackend;
  core: ConfigCore;
  services_directory: string;
  token: string;
}

@Injectable()
export class ConfigService {
  getConfig(): Config {
    const config: Config = readYAML('../core/upaas_config.yaml');
    return config;
  }
}
