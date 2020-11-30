import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ServicesModule } from './services.module';
import { ServicesService } from './services.service';
import { UserEntity } from '../users/entity/user.entity';

const config = new ConfigService().getConfig();

describe('ServicesService', () => {
  let service: ServicesService;

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
        ServicesModule,
      ],
      providers: [ServicesService],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
