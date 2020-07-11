import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { EventsService } from './events.service';
import EventPayload from '../types/EventPayload';

@Controller('api/events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @UseGuards(AuthGuard())
  @Post('send')
  public async postEvent(@Body() event: EventPayload): Promise<EventPayload> {
    return await this.eventsService.sendEvent(event);
  }
}
