import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { LogDto } from './dto/log.dto';
import { LogEntity } from './entity/log.entity';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { UserEntity } from '../users/entity/user.entity';
import { UsersModule } from '../users/users.module';

const config = new ConfigService().getConfig();

describe('LogsController', () => {
  let controller: LogsController;
  let service: LogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogsController],
      imports: [
        ConfigModule,
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
        JwtModule.register({
          secret: config.backend.secret,
          signOptions: {
            expiresIn: config.backend.token_expiry,
          },
        }),
        PassportModule.register({
          defaultStrategy: 'jwt',
          property: 'user',
          session: false,
        }),
        UsersModule,
      ],
      providers: [LogsService],
    }).compile();

    controller = module.get<LogsController>(LogsController);
    service = module.get<LogsService>(LogsService);
  });

  describe('controller', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('service', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('getLogs', () => {
    it('should return logs', async () => {
      const data: LogDto[] = [
        {
          id: uuidv4(),
          text: 'test',
          level: 'info',
          type: 'core',
        },
      ];

      jest.spyOn(service, 'find').mockImplementation(async () => data);

      const result = await controller.getLogs();

      expect(result).toBe(data);
    });
  });
});
