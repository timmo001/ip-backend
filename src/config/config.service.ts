import { Injectable } from "@nestjs/common";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

import { getAppDataDirectory, readYAML, saveYAML } from "../shared/utils";
import Config from "src/types/Config";

@Injectable()
export class ConfigService {
  private configPath = join(getAppDataDirectory(), "config.yml");

  constructor() {
    this.getConfig();
  }

  getConfig(): Config {
    let config: Config = readYAML(this.configPath);
    if (!config) {
      config = {
        backend: {
          api_port: 5684,
          secret: uuidv4(),
          token_expiry: "1800s",
        },
        core: {
          host: "localhost",
          log_level: "debug",
          socket_port: 1337,
        },
        database: {
          database: "upaas",
          host: "localhost",
          password: Math.random().toString(36).substr(2, 10),
          port: 3306,
          username: "upaasuser",
        },
        services_directory: join(getAppDataDirectory(), "services"),
        token: uuidv4(),
      };
      this.updateConfig(config);
    }
    return config;
  }

  updateConfig(config: Config): Config {
    saveYAML(this.configPath, config);
    return config;
  }
}
