import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { LogEntity } from './entity/log.entity';
import { LogsModule } from './logs.module';
import { LogsService } from './logs.service';
import { UserEntity } from '../users/entity/user.entity';

const config = new ConfigService().getConfig();

describe('LogsService', () => {
  let service: LogsService;

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
          entities: [LogEntity, UserEntity],
          keepConnectionAlive: true,
        }),
        TypeOrmModule.forFeature([LogEntity]),
        ConfigModule,
        LogsModule,
      ],
      providers: [LogsService],
    }).compile();

    service = module.get<LogsService>(LogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
