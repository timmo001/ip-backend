import { Injectable } from '@nestjs/common';
import { SubscribeMessage, MessageBody } from '@nestjs/websockets';

@Injectable()
export class EventGateways {
  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    return data;
  }
}
