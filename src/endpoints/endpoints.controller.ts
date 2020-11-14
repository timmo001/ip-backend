import {
  Body,
  Controller,
  Delete,
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
  @Delete(':id')
  public async deleteEndpoint(
    @Param() params: Params
  ): Promise<{ id: string }> {
    return { id: await this.endpointsService.delete(params.id) };
  }

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
