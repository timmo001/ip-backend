import { Injectable } from '@nestjs/common';

import { ConfigService } from '../config/config.service';
import { EventsService } from 'src/events/events.service';
import ApiResponse from '../types/ApiResponse';
import Config from '../types/Config';
import EventResponse from 'src/types/EventResponse';
import Generic from '../types/Generic';
import Params from '../types/Params';

@Injectable()
export class ApiService {
  config: Config;

  constructor(
    private readonly configService: ConfigService,
    private readonly eventsService: EventsService
  ) {
    this.config = this.configService.getConfig();
  }

  async apiDelete(params: Params, body: Generic): Promise<ApiResponse> {
    const response: EventResponse = await this.eventsService.sendEvent({
      service: params.endpoint,
      data: { params, payload: body },
    });
    if (response.resultOnly) return response;
    return { ...response, params, body };
  }

  async apiGet(params: Params): Promise<Generic> {
    const response: EventResponse = await this.eventsService.sendEvent({
      service: params.endpoint,
      data: { params, payload: null },
    });
    if (response.resultOnly) return response;
    return { ...response, params };
  }

  async apiPatch(params: Params, body: Generic): Promise<Generic> {
    const response: EventResponse = await this.eventsService.sendEvent({
      service: params.endpoint,
      data: { params, payload: body },
    });
    if (response.resultOnly) return response;
    return { ...response, params, body };
  }

  async apiPost(params: Params, body: Generic): Promise<Generic> {
    const response: EventResponse = await this.eventsService.sendEvent({
      service: params.endpoint,
      data: { params, payload: body },
    });
    if (response.resultOnly) return response;
    return { ...response, params, body };
  }

  async apiPut(params: Params, body: Generic): Promise<Generic> {
    const response: EventResponse = await this.eventsService.sendEvent({
      service: params.endpoint,
      data: { params, payload: body },
    });
    if (response.resultOnly) return response;
    return { ...response, params, body };
  }
}
