import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { LogsService } from "./logs.service";
import { LogEntity } from "./entity/log.entity";

@Controller("backend/logs")
export class LogsController {
  constructor(private logsService: LogsService) {}

  @UseGuards(AuthGuard())
  @Get()
  public async getLogs(): Promise<LogEntity[]> {
    return await this.logsService.find();
  }

  @UseGuards(AuthGuard())
  @Get(":id")
  public async getLog(@Param() params: { id: string }): Promise<LogEntity> {
    return await this.logsService.findOne({ where: { id: params.id } });
  }
}
