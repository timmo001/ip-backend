import * as mariadb from 'mariadb';
import { Connection, Pool } from 'mariadb';
import { Injectable, Logger } from '@nestjs/common';
import * as WebSocket from 'ws';

import { ConfigService } from '../config/config.service';
import Config from '../types/Config';
import Event from '../types/Event';
import EventResponse from 'src/types/EventResponse';
import Generic from 'src/types/Generic';

@Injectable()
export class EventsService {
  public websocket: WebSocket;

  private config: Config;
  private connection: Connection;
  private logger: Logger = new Logger(EventsService.name);

  constructor() {
    this.config = new ConfigService().getConfig();
    this.init();
    this.websocket = new WebSocket(
      `ws://${this.config.core.host}:${this.config.core.socket_port}`
    );
    this.websocket.on('open', this.websocketOpened);
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
    this.logger.debug(`sendEvent: ${JSON.stringify(event)}`);
    this.websocket.send(JSON.stringify({ ...event, token: this.config.token }));
    return new Promise((resolve, reject) => {
      this.websocket.on('message', (data: string): void => {
        this.logger.debug(`WS - message received: ${data}`);
        resolve(JSON.parse(data));
      });
      this.websocket.on('error', (error: Generic): void => {
        this.logger.debug(`WS - error: ${error}`);
        reject(error);
      });
    });
  }

  websocketOpened = (): void => {
    this.logger.debug(`WS - Connected to ${this.websocket.url}`);
  };
}
