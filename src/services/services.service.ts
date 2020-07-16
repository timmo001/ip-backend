import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

import { ConfigService } from '../config/config.service';
import { readYAML, saveYAML } from '../shared/utils';
import Config from '../types/Config';
import Params from '../types/Params';
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
            id: file.replace('.yaml', ''),
            ...readYAML(`${this.config.services_directory}/${file}`),
          }
      );
    }
    return null;
  }

  deleteService(id: string): Params | null {
    const path = `${this.config.services_directory}/${id}.yaml`;
    fs.unlinkSync(path);
    return { id };
  }

  saveService(id: string, service: Service): Params | null {
    const path = `${this.config.services_directory}/${id}.yaml`;
    delete service.id;
    saveYAML(path, service);
    return { id };
  }
}
