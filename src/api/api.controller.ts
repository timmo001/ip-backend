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
  public async apiDelete(
    @Body() body: Generic,
    @Param() params: Params,
    @Request() request: Request
  ): Promise<ApiResponse> {
    this.logger.debug(`apiDelete: ${JSON.stringify(params)}`);
    const response: ApiResponse = await this.apiService.apiDelete(params, body);
    return response.resultOnly
      ? response
      : { ...response, request: { method: request.method, url: request.url } };
  }

  @UseGuards(AuthGuard())
  @Delete(':environment/:version/:endpoint/:id')
  public async apiDeleteWithId(
    @Body() body: Generic,
    @Param() params: Params,
    @Request() request: Request
  ): Promise<ApiResponse> {
    this.logger.debug(`apiDeleteWithId: ${JSON.stringify(params)}`);
    const response: ApiResponse = await this.apiService.apiDelete(params, body);
    return response.resultOnly
      ? response
      : { ...response, request: { method: request.method, url: request.url } };
  }

  @UseGuards(AuthGuard())
  @Get(':environment/:version/:endpoint')
  public async apiGet(
    @Param() params: Params,
    @Request() request: Request
  ): Promise<ApiResponse> {
    this.logger.debug(`apiGet: ${JSON.stringify(params)}`);
    const response: ApiResponse = await this.apiService.apiGet(params);
    this.logger.debug(`response: ${JSON.stringify(response)}`);
    return response.resultOnly
      ? response
      : { ...response, request: { method: request.method, url: request.url } };
  }

  @UseGuards(AuthGuard())
  @Get(':environment/:version/:endpoint/:id')
  public async apiGetWithId(
    @Param() params: Params,
    @Request() request: Request
  ): Promise<ApiResponse> {
    this.logger.debug(`apiGet: ${JSON.stringify(params)}`);
    const response: ApiResponse = await this.apiService.apiGet(params);
    return response.resultOnly
      ? response
      : { ...response, request: { method: request.method, url: request.url } };
  }

  @UseGuards(AuthGuard())
  @Patch(':environment/:version/:endpoint')
  public async apiPatch(
    @Body() body: Generic,
    @Param() params: Params,
    @Request() request: Request
  ): Promise<ApiResponse> {
    this.logger.debug(
      `apiPatch: ${JSON.stringify(params)} - ${JSON.stringify(body)}`
    );
    const response: ApiResponse = await this.apiService.apiPatch(params, body);
    return response.resultOnly
      ? response
      : { ...response, request: { method: request.method, url: request.url } };
  }

  @UseGuards(AuthGuard())
  @Patch(':environment/:version/:endpoint/:id')
  public async apiPatchWithId(
    @Body() body: Generic,
    @Param() params: Params,
    @Request() request: Request
  ): Promise<ApiResponse> {
    this.logger.debug(
      `apiPatchWithId: ${JSON.stringify(params)} - ${JSON.stringify(body)}`
    );
    const response: ApiResponse = await this.apiService.apiPatch(params, body);
    return response.resultOnly
      ? response
      : { ...response, request: { method: request.method, url: request.url } };
  }

  @UseGuards(AuthGuard())
  @Post(':environment/:version/:endpoint')
  public async apiPost(
    @Body() body: Generic,
    @Param() params: Params,
    @Request() request: Request
  ): Promise<ApiResponse> {
    this.logger.debug(
      `apiPost: ${JSON.stringify(params)} - ${JSON.stringify(body)}`
    );
    const response: ApiResponse = await this.apiService.apiPost(params, body);
    return response.resultOnly
      ? response
      : { ...response, request: { method: request.method, url: request.url } };
  }

  @UseGuards(AuthGuard())
  @Post(':environment/:version/:endpoint/:id')
  public async apiPostWithId(
    @Body() body: Generic,
    @Param() params: Params,
    @Request() request: Request
  ): Promise<ApiResponse> {
    this.logger.debug(
      `apiPostWithId: ${JSON.stringify(params)} - ${JSON.stringify(body)}`
    );
    const response: ApiResponse = await this.apiService.apiPost(params, body);
    return response.resultOnly
      ? response
      : { ...response, request: { method: request.method, url: request.url } };
  }

  @UseGuards(AuthGuard())
  @Put(':environment/:version/:endpoint')
  public async apiPut(
    @Body() body: Generic,
    @Param() params: Params,
    @Request() request: Request
  ): Promise<ApiResponse> {
    this.logger.debug(`apiPut: ${JSON.stringify(params)} - ${body}`);
    const response: ApiResponse = await this.apiService.apiPut(params, body);
    return response.resultOnly
      ? response
      : { ...response, request: { method: request.method, url: request.url } };
  }

  @UseGuards(AuthGuard())
  @Put(':environment/:version/:endpoint/:id')
  public async apiPutWithId(
    @Body() body: Generic,
    @Param() params: Params,
    @Request() request: Request
  ): Promise<ApiResponse> {
    this.logger.debug(
      `apiPutWithId: ${JSON.stringify(params)} - ${JSON.stringify(body)}`
    );
    const response: ApiResponse = await this.apiService.apiPut(params, body);
    return response.resultOnly
      ? response
      : { ...response, request: { method: request.method, url: request.url } };
  }
}
