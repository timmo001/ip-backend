import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { v4 as uuidv4 } from "uuid";

import { ServicesService } from "./services.service";
import Data from "../types/Data";
import Service from "../types/Service";

@Controller("backend/services")
export class ServicesController {
  private logger: Logger = new Logger(ServicesController.name);

  constructor(private servicesService: ServicesService) {}

  @UseGuards(AuthGuard())
  @Delete(":id")
  public deleteService(@Param() params: Data): Data | null {
    this.logger.debug(`deleteService: ${params.id}`);
    return this.servicesService.deleteService(params.id);
  }

  @UseGuards(AuthGuard())
  @Get()
  public getServices(): Service[] {
    return this.servicesService.getServices();
  }

  @UseGuards(AuthGuard())
  @Get(":id")
  public getService(@Param() params: Data): Service | null {
    this.logger.debug(`getService: ${params.id}`);
    const services: Service[] = this.servicesService.getServices();
    return services.find((service: Service) => service.id === params.id);
  }

  @UseGuards(AuthGuard())
  @Post()
  public addService(@Body() service: Service): Data | null {
    this.logger.debug(`updateService: ${service.name}`);
    const services: Service[] = this.servicesService.getServices();
    let id: string;
    while (true) {
      id = uuidv4();
      if (services.findIndex((service: Service) => service.id === id) === -1)
        break;
    }
    return this.servicesService.saveService(id, service);
  }

  @UseGuards(AuthGuard())
  @Put(":id")
  public updateService(
    @Param() params: Data,
    @Body() service: Service
  ): Data | null {
    this.logger.debug(`updateService: ${params.id} - ${service.name}`);
    return this.servicesService.saveService(params.id, service);
  }
}
