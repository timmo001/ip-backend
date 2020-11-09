import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { EndpointsService } from './endpoints.service';
import { EndpointEntity } from './entity/endpoint.entity';

@Controller('backend/endpoints')
export class EndpointsController {
  constructor(private endpointsService: EndpointsService) {}

  @UseGuards(AuthGuard())
  @Get()
  public async getEndpoints(): Promise<EndpointEntity[]> {
    return await this.endpointsService.find();
  }

  @UseGuards(AuthGuard())
  @Post()
  public async createEndpoint(@Body() endpoint: EndpointEntity): Promise<EndpointEntity> {
    return await this.endpointsService.create(endpoint);
  }
}
