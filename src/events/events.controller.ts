import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { EventsService } from './events.service';
import { EventDto } from './dto/event.dto';

@Controller('api/events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @UseGuards(AuthGuard())
  @Post('send')
  public async postEvent(@Body() event: EventDto): Promise<EventDto> {
    return await this.eventsService.sendEvent(event);
  }
}
