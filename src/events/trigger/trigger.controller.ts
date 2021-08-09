import {
  Body,
  Controller,
  HttpException,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { EventTriggerService } from "./trigger.service";
import ApiResponse from "../../types/ApiResponse";
import Data from "../../types/Data";
import Generic from "../../types/Generic";
import GenericObject from "../../types/GenericObject";

@Controller("backend/events/:id/trigger")
export class EventTriggerController {
  constructor(private eventTriggerService: EventTriggerService) {}

  @UseGuards(AuthGuard())
  @Post()
  public async postEvent(
    @Body() body: Generic,
    @Param() params: Data,
    @Query() query: GenericObject,
    @Request() request?: Request
  ): Promise<ApiResponse> {
    const result = await this.eventTriggerService.sendEvent({
      data: {
        body,
        headers: request?.headers,
        method: request?.method,
        parameters: query,
        url: request?.url,
      },
      serviceKey: params.id,
    });
    if (result.response && result.response["errorCode"])
      throw new HttpException(
        result.response["message"],
        result.response["errorCode"]
      );
    return result;
  }
}
