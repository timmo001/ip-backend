import { Injectable } from '@nestjs/common';

import { ConfigService, Config } from '../config/config.service';
import { EventPayload } from './events.controller';
import { readYAML } from '../shared/utils';

@Injectable()
export class EventsService {
  config: Config;

  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.getConfig();
  }

  async sendEvent(event: EventPayload): Promise<EventPayload> {
    return readYAML(this.config.services_directory);
  }
}
