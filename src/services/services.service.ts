import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

import { ConfigService, Config } from '../config/config.service';
import { readYAML, saveYAML } from '../shared/utils';
import Service from '../types/Service';

@Injectable()
export class ServicesService {
  config: Config;

  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.getConfig();
  }

  getServices(): Service[] | null {
    const services_dir = fs.readdirSync(this.config.services_directory, {
      encoding: 'utf8',
    });
    if (services_dir) {
      return services_dir.map(
        (file: string) =>
          file.endsWith('.yaml') && {
            key: file.replace('.yaml', ''),
            ...readYAML(`${this.config.services_directory}/${file}`),
          }
      );
    }
    return null;
  }

  saveService(service: Service): Service | null {
    const path = `${this.config.services_directory}/${service.key}.yaml`;
    delete service.key;
    saveYAML(path, service);
    return service;
  }
}
