import { Injectable } from '@nestjs/common';

import { readYAML } from '../shared/utils';
import Config from 'src/types/Config';

@Injectable()
export class ConfigService {
  getConfig(): Config {
    const config: Config = readYAML('../core/upaas_config.yaml');
    return config;
  }
}
