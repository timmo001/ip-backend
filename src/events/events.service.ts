import * as mariadb from 'mariadb';
import { Connection, Pool } from 'mariadb';
import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';

import { ConfigService } from '../config/config.service';
import Config from '../types/Config';
import Event from '../types/Event';
import EventResponse from 'src/types/EventResponse';

@Injectable()
export class EventsService {
  private config: Config;
  private connection: Connection;

  constructor() {
    this.config = new ConfigService().getConfig();
    this.init();
  }

  async init(): Promise<void> {
    const pool: Pool = mariadb.createPool({
      database: this.config.database.database,
      host: this.config.database.host,
      password: this.config.database.password,
      user: this.config.database.username,
    });
    this.connection = await pool.getConnection();
  }

  async getEvents(): Promise<Event[]> {
    // return [];
    return await this.connection.query(
      'SELECT id,service,status,started,updated,completed,message FROM events;'
    );
  }

  async sendEvent(event: Event): Promise<EventResponse> {
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
