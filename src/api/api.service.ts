import { Injectable } from '@nestjs/common';

import { ConfigService } from '../config/config.service';
import { EndpointsService } from '../endpoints/endpoints.service';
import { EventsService } from 'src/events/events.service';
import ApiResponse from '../types/ApiResponse';
import Config from '../types/Config';
import EventResponse from 'src/types/EventResponse';
import Generic from '../types/Generic';
import Params from '../types/Params';
import { EndpointEntity } from 'src/endpoints/entity/endpoint.entity';

@Injectable()
export class ApiService {
  config: Config;

  constructor(
    private readonly configService: ConfigService,
    private readonly endpointsService: EndpointsService,
    private readonly eventsService: EventsService
  ) {
    this.config = this.configService.getConfig();
    this.endpointsService = this.endpointsService;
  }

  async apiSend(params: Params, body?: Generic): Promise<ApiResponse> {
    const endpoint: EndpointEntity = await this.endpointsService.findOne({
      where: { endpoint: params.endpoint },
    });
    const response: EventResponse = await this.eventsService.sendEvent({
      data: { params, payload: body },
      service: params.endpoint,
      serviceKey: endpoint.service,
    });
    return response.resultOnly ? response : { ...response, params, body };
  }
}
