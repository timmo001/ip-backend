import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';

import { EventDto } from './dto/event.dto';
import { EventEntity } from './entity/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepo: Repository<EventEntity>
  ) {}

  async find(options?: FindManyOptions<EventEntity>): Promise<EventDto[]> {
    return await this.eventRepo.find(options);
  }

  async findOne(options?: FindOneOptions<EventEntity>): Promise<EventDto> {
    return await this.eventRepo.findOne(options);
  }

  async create(eventDto: EventDto): Promise<EventDto> {
    const event: EventEntity = this.eventRepo.create({
      ...eventDto,
      id: undefined,
    });

    await this.eventRepo.save(event);

    return event;
  }
}
