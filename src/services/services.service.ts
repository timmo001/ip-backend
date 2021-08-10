import { Injectable } from "@nestjs/common";
import { existsSync, mkdirSync, readdirSync, unlinkSync } from "fs";

import { ConfigService } from "../config/config.service";
import { readYAML, saveYAML } from "../shared/utils";
import Config from "../types/Config";
import Data from "../types/Data";
import Service from "../types/Service";

@Injectable()
export class ServicesService {
  config: Config;

  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.getConfig();
    if (!existsSync(this.config.services_directory))
      mkdirSync(this.config.services_directory);
  }

  getServices(): Service[] | null {
    const services_dir = readdirSync(this.config.services_directory, {
      encoding: "utf8",
    });
    if (services_dir) {
      return services_dir.map(
        (file: string) =>
          file.endsWith(".yml") && {
            id: file.replace(".yml", ""),
            ...readYAML(`${this.config.services_directory}/${file}`),
          }
      );
    }
    return null;
  }

  deleteService(id: string): Data | null {
    const path = `${this.config.services_directory}/${id}.yml`;
    unlinkSync(path);
    return { id };
  }

  saveService(id: string, service: Service): Data | null {
    const path = `${this.config.services_directory}/${id}.yml`;
    delete service.id;
    saveYAML(path, service);
    return { id };
  }
}
