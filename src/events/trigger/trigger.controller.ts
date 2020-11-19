import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import Event from '../../types/Event';
import { EventTriggerService } from './trigger.service';

@Controller('backend/events/:id/trigger')
export class EventTriggerController {
  constructor(private eventTriggerService: EventTriggerService) {}

  @UseGuards(AuthGuard())
  @Post()
  public async postEvent(@Body() event: Event): Promise<Event> {
    return await this.eventTriggerService.sendEvent(event);
  }
}
