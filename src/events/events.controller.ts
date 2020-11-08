import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import Event from '../types/Event';
import { EventDto } from './dto/event.dto';
import { EventsService } from './events.service';

@Controller('backend/events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @UseGuards(AuthGuard())
  @Get()
  public async getEvents(): Promise<Event[]> {
    return await this.eventsService.getEvents();
  }

  @UseGuards(AuthGuard())
  @Post()
  public async postEvent(@Body() event: EventDto): Promise<EventDto> {
    return await this.eventsService.sendEvent(event);
  }
}
