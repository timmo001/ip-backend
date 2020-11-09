import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { EndpointsService } from './endpoints.service';
import { EndpointEntity } from './entity/endpoint.entity';
import Params from '../types/Params';

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
  public async createEndpoint(
    @Body() endpoint: EndpointEntity
  ): Promise<EndpointEntity> {
    return await this.endpointsService.create(endpoint);
  }

  @UseGuards(AuthGuard())
  @Put(':id')
  public async updateEndpoint(
    @Param() params: Params,
    @Body() endpoint: EndpointEntity
  ): Promise<EndpointEntity> {
    return await this.endpointsService.update(params.id, endpoint);
  }
}
