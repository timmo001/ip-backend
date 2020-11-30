import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { EndpointDto } from './dto/endpoint.dto';
import { EndpointEntity } from './entity/endpoint.entity';
import { EndpointsController } from './endpoints.controller';
import { EndpointsService } from './endpoints.service';
import { UserEntity } from '../users/entity/user.entity';
import { UsersModule } from '../users/users.module';

const config = new ConfigService().getConfig();

describe('EndpointsController', () => {
  let controller: EndpointsController;
  let service: EndpointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EndpointsController],
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
        TypeOrmModule.forFeature([EndpointEntity]),
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
      providers: [EndpointsService],
    }).compile();

    controller = module.get<EndpointsController>(EndpointsController);
    service = module.get<EndpointsService>(EndpointsService);
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

  describe('getEndpoints', () => {
    it('should return endpoints', async () => {
      const data: EndpointDto[] = [
        {
          id: uuidv4(),
          endpoint: 'test',
          service: 'test',
          name: 'test',
          resultOnly: false,
          logLevel: 'debug',
          supportedMethods: 'GET',
          published: true,
        },
      ];

      jest.spyOn(service, 'find').mockImplementation(async () => data);

      const result = await controller.getEndpoints();

      expect(result).toBe(data);
    });
  });
});
