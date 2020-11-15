import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindManyOptions,
  FindOneOptions,
  UpdateResult,
} from 'typeorm';

import { EndpointDto } from './dto/endpoint.dto';
import { EndpointEntity } from './entity/endpoint.entity';

@Injectable()
export class EndpointsService {
  constructor(
    @InjectRepository(EndpointEntity)
    private readonly endpointRepo: Repository<EndpointEntity>
  ) {}

  async find(
    options?: FindManyOptions<EndpointEntity>
  ): Promise<EndpointDto[]> {
    return await this.endpointRepo.find(options);
  }

  async findOne(
    options?: FindOneOptions<EndpointEntity>
  ): Promise<EndpointDto> {
    return await this.endpointRepo.findOne(options);
  }

  async delete(id: string): Promise<string> {
    this.endpointRepo.delete(id);
    return id;
  }

  async create(endpointDto: EndpointDto): Promise<EndpointDto> {
    // Check if the endpoint exists in the db
    const endpointInDb = await this.endpointRepo.findOne({
      where: { endpoint: endpointDto.endpoint },
    });
    if (endpointInDb) {
      throw new HttpException(
        'Endpoint already exists',
        HttpStatus.BAD_REQUEST
      );
    }

    const endpoint: EndpointEntity = this.endpointRepo.create({
      ...endpointDto,
      id: undefined,
    });

    await this.endpointRepo.save(endpoint);

    return endpoint;
  }

  async update(id: string, endpointDto: EndpointDto): Promise<EndpointDto> {
    this.endpointRepo.update(id, endpointDto);
    return endpointDto;
  }
}
