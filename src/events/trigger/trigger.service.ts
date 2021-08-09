import { Injectable, Logger } from "@nestjs/common";
import WebSocket from "ws";

import { ConfigService } from "../../config/config.service";
import ApiResponse from "../../types/ApiResponse";
import Config from "../../types/Config";
import Event from "../../types/Event";
import Generic from "../../types/Generic";

@Injectable()
export class EventTriggerService {
  public websocket: WebSocket;

  private config: Config;
  private logger: Logger = new Logger(EventTriggerService.name);

  constructor() {
    this.config = new ConfigService().getConfig();
  }

  async sendEvent(event: Event): Promise<ApiResponse> {
    this.logger.debug(`sendEvent: ${JSON.stringify(event)}`);
    if (!this.websocket) this.startWebsocketConnection();
    this.websocket.send(JSON.stringify({ ...event, token: this.config.token }));
    return new Promise((resolve, reject) => {
      this.websocket.on("message", (data: string): void => {
        this.logger.debug(`WS - message received: ${data}`);
        resolve(JSON.parse(data));
      });
      this.websocket.on("error", (error: Generic): void => {
        this.logger.debug(`WS - error: ${error}`);
        reject(error);
      });
    });
  }

  startWebsocketConnection() {
    const url = `ws://${this.config.core.host}:${this.config.core.socket_port}`;
    this.websocket = new WebSocket(url);
    this.websocket.on("open", this.websocketOpened);
    this.websocket.on("close", this.websocketClosed);
    this.websocket.on("error", (error: Generic): void => {
      this.logger.debug(`WS - error: ${error}`);
    });
  }

  websocketOpened = (): void => {
    this.logger.debug(`WS - Connected to ${this.websocket.url}`);
  };

  websocketClosed = (): void => {
    this.logger.debug(`WS - Connection closed. Reconnecting in 5 seconds..`);
    setTimeout(() => this.startWebsocketConnection(), 5000);
  };
}
