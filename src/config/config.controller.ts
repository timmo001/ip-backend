import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ConfigService, Config } from './config.service';

@Controller('config')
export class ConfigController {
  constructor(private configService: ConfigService) {}

  @UseGuards(AuthGuard())
  @Get()
  public async getConfig(): Promise<Config> {
    return await this.configService.getConfig();
  }
}
