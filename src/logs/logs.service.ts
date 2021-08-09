import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindManyOptions, FindOneOptions } from "typeorm";

import { LogDto } from "./dto/log.dto";
import { LogEntity } from "./entity/log.entity";

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(LogEntity)
    private readonly logRepo: Repository<LogEntity>
  ) {}

  async find(options?: FindManyOptions<LogEntity>): Promise<LogDto[]> {
    return await this.logRepo.find(options);
  }

  async findOne(options?: FindOneOptions<LogEntity>): Promise<LogDto> {
    return await this.logRepo.findOne(options);
  }

  async create(logDto: LogDto): Promise<LogDto> {
    const log: LogEntity = this.logRepo.create({
      ...logDto,
      id: undefined,
    });

    await this.logRepo.save(log);

    return log;
  }
}
