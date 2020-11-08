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
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiService } from './api.service';
import Params from '../types/Params';
import Generic from 'src/types/Generic';
import ApiResponse from 'src/types/ApiResponse';

@Controller('api')
export class ApiController {
  private logger: Logger = new Logger(ApiController.name);

  constructor(private apiService: ApiService) {}

  @UseGuards(AuthGuard())
  @Delete(':environment/:version/:endpoint')
  public apiDelete(
    @Body() body: Generic,
    @Param() params: Params,
    @Request() request: Request
  ): ApiResponse | Generic {
    this.logger.debug(`apiDelete: ${JSON.stringify(params)}`);
    const response: ApiResponse | Generic = this.apiService.apiDelete(
      params,
      body
    );
    return response.resultOnly ? response : { ...response, url: request.url };
  }

  @UseGuards(AuthGuard())
  @Delete(':environment/:version/:endpoint/:id')
  public apiDeleteWithId(
    @Body() body: Generic,
    @Param() params: Params,
    @Request() request: Request
  ): ApiResponse | Generic {
    this.logger.debug(`apiDeleteWithId: ${JSON.stringify(params)}`);
    const response: ApiResponse | Generic = this.apiService.apiDelete(
      params,
      body
    );
    return response.resultOnly ? response : { ...response, url: request.url };
  }

  @UseGuards(AuthGuard())
  @Get(':environment/:version/:endpoint')
  public apiGet(
    @Param() params: Params,
    @Request() request: Request
  ): ApiResponse | Generic {
    this.logger.debug(`apiGet: ${JSON.stringify(params)}`);
    const response: ApiResponse | Generic = this.apiService.apiGet(params);
    return response.resultOnly ? response : { ...response, url: request.url };
  }

  @UseGuards(AuthGuard())
  @Get(':environment/:version/:endpoint/:id')
  public apiGetWithId(
    @Param() params: Params,
    @Request() request: Request
  ): ApiResponse | Generic {
    this.logger.debug(`apiGetWithId: ${JSON.stringify(params)}`);
    const response: ApiResponse | Generic = this.apiService.apiGet(params);
    return response.resultOnly ? response : { ...response, url: request.url };
  }

  @UseGuards(AuthGuard())
  @Patch(':environment/:version/:endpoint')
  public apiPatch(
    @Body() body: Generic,
    @Param() params: Params,
    @Request() request: Request
  ): ApiResponse | Generic {
    this.logger.debug(
      `apiPatch: ${JSON.stringify(params)} - ${JSON.stringify(body)}`
    );
    const response: ApiResponse | Generic = this.apiService.apiPatch(
      params,
      body
    );
    return response.resultOnly ? response : { ...response, url: request.url };
  }

  @UseGuards(AuthGuard())
  @Patch(':environment/:version/:endpoint/:id')
  public apiPatchWithId(
    @Body() body: Generic,
    @Param() params: Params,
    @Request() request: Request
  ): ApiResponse | Generic {
    this.logger.debug(
      `apiPatchWithId: ${JSON.stringify(params)} - ${JSON.stringify(body)}`
    );
    const response: ApiResponse | Generic = this.apiService.apiPatch(
      params,
      body
    );
    return response.resultOnly ? response : { ...response, url: request.url };
  }

  @UseGuards(AuthGuard())
  @Post(':environment/:version/:endpoint')
  public apiPost(
    @Body() body: Generic,
    @Param() params: Params,
    @Request() request: Request
  ): ApiResponse | Generic {
    this.logger.debug(
      `apiPost: ${JSON.stringify(params)} - ${JSON.stringify(body)}`
    );
    const response: ApiResponse | Generic = this.apiService.apiPost(
      params,
      body
    );
    return response.resultOnly ? response : { ...response, url: request.url };
  }

  @UseGuards(AuthGuard())
  @Post(':environment/:version/:endpoint/:id')
  public apiPostWithId(
    @Body() body: Generic,
    @Param() params: Params,
    @Request() request: Request
  ): ApiResponse | Generic {
    this.logger.debug(
      `apiPostWithId: ${JSON.stringify(params)} - ${JSON.stringify(body)}`
    );
    const response: ApiResponse | Generic = this.apiService.apiPost(
      params,
      body
    );
    return response.resultOnly ? response : { ...response, url: request.url };
  }

  @UseGuards(AuthGuard())
  @Put(':environment/:version/:endpoint')
  public apiPut(
    @Body() body: Generic,
    @Param() params: Params,
    @Request() request: Request
  ): ApiResponse | Generic {
    this.logger.debug(`apiPut: ${JSON.stringify(params)} - ${body}`);
    const response: ApiResponse | Generic = this.apiService.apiPut(
      params,
      body
    );
    return response.resultOnly ? response : { ...response, url: request.url };
  }

  @UseGuards(AuthGuard())
  @Put(':environment/:version/:endpoint/:id')
  public apiPutWithId(
    @Body() body: Generic,
    @Param() params: Params,
    @Request() request: Request
  ): ApiResponse | Generic {
    this.logger.debug(
      `apiPutWithId: ${JSON.stringify(params)} - ${JSON.stringify(body)}`
    );
    const response: ApiResponse | Generic = this.apiService.apiPut(
      params,
      body
    );
    return response.resultOnly ? response : { ...response, url: request.url };
  }
}
