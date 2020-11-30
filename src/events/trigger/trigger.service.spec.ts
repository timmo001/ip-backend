import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';
import { EventTriggerModule } from './trigger.module';
import { EventTriggerService } from './trigger.service';
import { UserEntity } from '../../users/entity/user.entity';

const config = new ConfigService().getConfig();

describe('EventTriggerService', () => {
  let service: EventTriggerService;

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
          entities: [UserEntity],
          keepConnectionAlive: true,
        }),
        ConfigModule,
        EventTriggerModule,
      ],
      providers: [EventTriggerService],
    }).compile();

    service = module.get<EventTriggerService>(EventTriggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
