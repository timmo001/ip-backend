import { Injectable } from '@nestjs/common';

import { readYAML } from '../shared/utils';

export interface ConfigBackend {
  api_port: number;
  secret: string;
  token_expiry: string;
}

export interface Config {
  log_level: string;
  services_directory: string;
  socket_port: number;
  backend: ConfigBackend;
}

@Injectable()
export class ConfigService {
  getConfig(): Config {
    const config: Config = readYAML('../core/upaas_config.yaml');
    return config;
  }
}
