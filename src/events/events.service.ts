import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';

import { ConfigService, Config } from '../config/config.service';
import { EventDto } from './dto/event.dto';

@Injectable()
export class EventsService {
  private config: Config;

  constructor() {
    this.config = new ConfigService().getConfig();
  }

  async sendEvent(event: EventDto): Promise<EventDto> {
    const url = `ws://${this.config.core.host}:${this.config.core.socket_port}`;
    const ws = new WebSocket(url);
    ws.on('open', () => {
      console.log('WS - Connected to', url);
      ws.send(JSON.stringify({ ...event, token: this.config.token }));
    });
    ws.on('message', (data: any) => {
      console.log('WS - message received:', data);
      ws.close();
    });
    ws.on('error', (error: any) => {
      console.log('WS - error:', error);
      ws.close();
    });
    return event;
  }
}
