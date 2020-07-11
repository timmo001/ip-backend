import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { EventsService } from './events.service';

export interface EventPayload {
  type: 'service';
  serviceKey?: string;
}

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @UseGuards(AuthGuard())
  @Post()
  public async postEvent(@Body() event: EventPayload): Promise<EventPayload> {
    return await this.eventsService.sendEvent(event);
  }
}
