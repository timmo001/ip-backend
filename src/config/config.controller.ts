import { AuthGuard } from "@nestjs/passport";
import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";

import { ConfigService } from "./config.service";
import Config from "../types/Config";

@Controller("backend/config")
export class ConfigController {
  constructor(private configService: ConfigService) {}

  @UseGuards(AuthGuard())
  @Get()
  public getConfig(): Config {
    return this.configService.getConfig();
  }

  @UseGuards(AuthGuard())
  @Put()
  public updateConfig(@Body() config: Config): Config {
    return this.configService.updateConfig(config);
  }
}
