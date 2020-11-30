import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiModule } from './api.module';
import { ApiService } from './api.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { EndpointEntity } from '../endpoints/entity/endpoint.entity';
import { EndpointsModule } from '../endpoints/endpoints.module';
import { EventTriggerModule } from '../events/trigger/trigger.module';
import { UserEntity } from '../users/entity/user.entity';

const config = new ConfigService().getConfig();

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mariadb',
          host: config.database.host,
          port: config.database.port,
          username: config.database.username,
          password: config.database.password,
          database: config.database.database,
          entities: [EndpointEntity, UserEntity],
          keepConnectionAlive: true,
        }),
        ApiModule,
        ConfigModule,
        EndpointsModule,
        EventTriggerModule,
      ],
      providers: [ApiService],
    }).compile();

    service = module.get<ApiService>(ApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
