import { Injectable } from '@nestjs/common';

import { EventPayload } from './events.controller';

@Injectable()
export class EventsService {
  async sendEvent(event: EventPayload): Promise<EventPayload> {
    return event;
  }
}
