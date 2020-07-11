import { Controller, Body, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ServicesService } from './services.service';
import Service from '../types/Service';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @UseGuards(AuthGuard())
  @Get()
  public getServices(): Service[] {
    return this.servicesService.getServices();
  }

  @UseGuards(AuthGuard())
  @Post('save')
  public saveService(@Body() service: Service): Service | null {
    return this.servicesService.saveService(service);
  }
}
