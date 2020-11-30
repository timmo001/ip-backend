import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';

import { ApiController } from './api.controller';
import { ApiModule } from './api.module';
import { ApiService } from './api.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { EndpointEntity } from '../endpoints/entity/endpoint.entity';
import { EndpointsModule } from '../endpoints/endpoints.module';
import { EventTriggerModule } from '../events/trigger/trigger.module';
import { UserEntity } from '../users/entity/user.entity';
import { UsersModule } from '../users/users.module';
import ApiResponse from 'src/types/ApiResponse';

const config = new ConfigService().getConfig();

describe('ApiController', () => {
  let controller: ApiController;
  let service: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      imports: [
        ConfigModule,
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
        EndpointsModule,
        EventTriggerModule,
        UsersModule,
      ],
      providers: [ApiService],
    }).compile();

    controller = module.get<ApiController>(ApiController);
    service = module.get<ApiService>(ApiService);
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

  describe('getApi', () => {
    it('should return api', async () => {
      const data: ApiResponse = { response: {}, request: {} };

      jest.spyOn(service, 'apiSend').mockImplementation(async () => data);

      const result = await controller.apiGet({}, {});

      expect(result).toBe(data);
    });
  });
});
