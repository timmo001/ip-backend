import { existsSync, mkdirSync } from "fs";
import { Injectable } from "@nestjs/common";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

import { getAppDataDirectory, readYAML, saveYAML } from "../shared/utils";
import Config from "../types/Config";

@Injectable()
export class ConfigService {
  private configPath = join(getAppDataDirectory(), "config.yml");

  constructor() {
    const dir = getAppDataDirectory();
    if (!existsSync(dir)) mkdirSync(dir);
    this.getConfig();
  }

  getConfig(): Config {
    let config: Config = readYAML(this.configPath);
    if (!config) {
      config = {
        backend: {
          api_port: 5684,
          secret: uuidv4(),
          token_expiry: "3600s",
        },
        core: {
          host: "localhost",
          log_level: "debug",
          socket_port: 5686,
        },
        database: {
          type: "better-sqlite3",
          database: join(getAppDataDirectory(), "ip_v1.db"),
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
