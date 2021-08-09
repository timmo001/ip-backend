import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { EventsService } from "./events.service";
import { EventEntity } from "./entity/event.entity";

@Controller("backend/events")
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @UseGuards(AuthGuard())
  @Get()
  public async getEvents(): Promise<EventEntity[]> {
    return await this.eventsService.find();
  }

  @UseGuards(AuthGuard())
  @Get(":id")
  public async getEvent(@Param() params: { id: string }): Promise<EventEntity> {
    return await this.eventsService.findOne({ where: { id: params.id } });
  }
}
