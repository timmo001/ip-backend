import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { ConfigService } from "../config/config.service";
import { EndpointEntity } from "../endpoints/entity/endpoint.entity";
import { EndpointsService } from "../endpoints/endpoints.service";
import { EventTriggerService } from "../events/trigger/trigger.service";
import ApiResponse from "../types/ApiResponse";
import Config from "../types/Config";
import Data from "../types/Data";
import EventResponse from "../types/EventResponse";
import Generic from "../types/Generic";
import GenericObject from "../types/GenericObject";

@Injectable()
export class ApiService {
  config: Config;

  constructor(
    private readonly configService: ConfigService,
    private readonly endpointsService: EndpointsService,
    private readonly eventTriggerService: EventTriggerService
  ) {
    this.config = this.configService.getConfig();
    this.endpointsService = this.endpointsService;
  }

  async apiSend(
    data: Data,
    query: GenericObject,
    request: Request,
    body?: Generic
  ): Promise<ApiResponse | Generic> {
    const endpoint: EndpointEntity = await this.endpointsService.findOne({
      where: { endpoint: data.endpoint },
    });
    if (!endpoint)
      throw new HttpException("Could not find endpoint", HttpStatus.NOT_FOUND);
    if (
      !endpoint.supportedMethods
        .split(",")
        .includes(request.method.toUpperCase())
    )
      throw new HttpException(
        "Method not supported",
        HttpStatus.METHOD_NOT_ALLOWED
      );

    data = {
      ...data,
      body,
      headers: request.headers,
      method: request.method,
      parameters: query,
      url: request.url,
    };

    delete data.headers.authorization;
    delete data.headers["api-key"];

    const response: EventResponse = await this.eventTriggerService.sendEvent({
      data,
      resultOnly: endpoint.resultOnly,
      logLevel: endpoint.logLevel,
      serviceKey: endpoint.service,
    });
    if (response.errorCode)
      throw new HttpException(response.message, response.errorCode);
    return endpoint.resultOnly
      ? response
      : {
          ...response,
          request: { ...data },
        };
  }
}
