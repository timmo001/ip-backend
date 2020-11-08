import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiService } from './api.service';
import Params from '../types/Params';
import Generic from 'src/types/Generic';

@Controller('api')
export class ApiController {
  private logger: Logger = new Logger(ApiController.name);

  constructor(private apiService: ApiService) {}

  @UseGuards(AuthGuard())
  @Delete(':environment/:version/:endpoint')
  public apiDelete(@Param() params: Params): Generic {
    this.logger.debug(`apiDelete: ${JSON.stringify(params)}`);
    return this.apiService.apiDelete(params);
  }

  @UseGuards(AuthGuard())
  @Delete(':environment/:version/:endpoint/:id')
  public apiDeleteWithId(@Param() params: Params): Generic {
    this.logger.debug(`apiDeleteWithId: ${JSON.stringify(params)}`);
    return this.apiService.apiDelete(params);
  }

  @UseGuards(AuthGuard())
  @Get(':environment/:version/:endpoint')
  public apiGet(@Param() params: Params): Generic {
    this.logger.debug(`apiGet: ${JSON.stringify(params)}`);
    return this.apiService.apiGet(params);
  }

  @UseGuards(AuthGuard())
  @Get(':environment/:version/:endpoint/:id')
  public apiGetWithId(@Param() params: Params): Generic {
    this.logger.debug(`apiGetWithId: ${JSON.stringify(params)}`);
    return this.apiService.apiGet(params);
  }

  @UseGuards(AuthGuard())
  @Patch(':environment/:version/:endpoint')
  public apiPatch(@Param() params: Params, @Body() body: Generic): Generic {
    this.logger.debug(
      `apiPatch: ${JSON.stringify(params)} - ${JSON.stringify(body)}`
    );
    return this.apiService.apiPatch(params, body);
  }

  @UseGuards(AuthGuard())
  @Patch(':environment/:version/:endpoint/:id')
  public apiPatchWithId(
    @Param() params: Params,
    @Body() body: Generic
  ): Generic {
    this.logger.debug(
      `apiPatchWithId: ${JSON.stringify(params)} - ${JSON.stringify(body)}`
    );
    return this.apiService.apiPatch(params, body);
  }

  @UseGuards(AuthGuard())
  @Post(':environment/:version/:endpoint')
  public apiPost(@Param() params: Params, @Body() body: Generic): Generic {
    this.logger.debug(
      `apiPost: ${JSON.stringify(params)} - ${JSON.stringify(body)}`
    );
    return this.apiService.apiPost(params, body);
  }

  @UseGuards(AuthGuard())
  @Post(':environment/:version/:endpoint/:id')
  public apiPostWithId(
    @Param() params: Params,
    @Body() body: Generic
  ): Generic {
    this.logger.debug(
      `apiPostWithId: ${JSON.stringify(params)} - ${JSON.stringify(body)}`
    );
    return this.apiService.apiPost(params, body);
  }

  @UseGuards(AuthGuard())
  @Put(':environment/:version/:endpoint')
  public apiPut(@Param() params: Params, @Body() body: Generic): Generic {
    this.logger.debug(`apiPut: ${JSON.stringify(params)} - ${body}`);
    return this.apiService.apiPut(params, body);
  }

  @UseGuards(AuthGuard())
  @Put(':environment/:version/:endpoint/:id')
  public apiPutWithId(@Param() params: Params, @Body() body: Generic): Generic {
    this.logger.debug(
      `apiPutWithId: ${JSON.stringify(params)} - ${JSON.stringify(body)}`
    );
    return this.apiService.apiPut(params, body);
  }
}
