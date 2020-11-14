import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

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

  async apiSend(
    request: Request,
    params: Params,
    body?: Generic
  ): Promise<ApiResponse | Generic> {
    const endpoint: EndpointEntity = await this.endpointsService.findOne({
      where: { endpoint: params.endpoint },
    });
    if (!endpoint)
      throw new HttpException('Could not find endpoint', HttpStatus.NOT_FOUND);
    if (
      !endpoint.supportedMethods
        .split(',')
        .includes(request.method.toUpperCase())
    )
      throw new HttpException(
        'Method not supported',
        HttpStatus.METHOD_NOT_ALLOWED
      );

    const response: EventResponse = await this.eventsService.sendEvent({
      data: { params, payload: body },
      resultOnly: endpoint.resultOnly,
      logLevel: endpoint.logLevel,
      service: params.endpoint,
      serviceKey: endpoint.service,
    });
    if (response.errorCode)
      throw new HttpException(response.message, response.errorCode);
    return endpoint.resultOnly
      ? response
      : {
          ...response,
          request: {
            body,
            method: request.method,
            params,
            url: request.url,
          },
        };
  }
}
