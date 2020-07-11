import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { MessageBody, SubscribeMessage } from '@nestjs/websockets';

import { ConfigService, Config } from './config.service';

@Controller('api/config')
export class ConfigController {
  constructor(private configService: ConfigService) {}

  @UseGuards(AuthGuard())
  @Get()
  @SubscribeMessage('config')
  public getConfig(): Config {
    return this.configService.getConfig();
  }
}
