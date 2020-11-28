import { Injectable } from '@nestjs/common';

import { readYAML, saveYAML } from '../shared/utils';
import Config from 'src/types/Config';

@Injectable()
export class ConfigService {
  private configPath = '../core/upaas_config.yaml';

  getConfig(): Config {
    const config: Config = readYAML(this.configPath);
    return config;
  }

  updateConfig(config: Config): Config {
    saveYAML(this.configPath, config);
    return config;
  }
}
