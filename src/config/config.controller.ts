import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards } from '@nestjs/common';
// import { SubscribeMessage, WsResponse } from '@nestjs/websockets';

import { ConfigService } from './config.service';
import Config from '../types/Config';
// import { Client } from 'socket.io';

@Controller('api/config')
export class ConfigController {
  constructor(private configService: ConfigService) {}

  @UseGuards(AuthGuard())
  @Get()
  public getConfig(): Config {
    return this.configService.getConfig();
  }

  // @UseGuards(AuthGuard())
  // @SubscribeMessage('config')
  // public wsConfig(client: Client, data: unknown): WsResponse<Config> {
  //   return { event: 'config', data: this.configService.getConfig() };
  // }
}
