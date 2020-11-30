import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { UserEntity } from '../users/entity/user.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import Service from '../types/Service';

const config = new ConfigService().getConfig();

describe('ServicesController', () => {
  let controller: ServicesController;
  let service: ServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesController],
      imports: [
        ConfigModule,
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
      providers: [ServicesService],
    }).compile();

    controller = module.get<ServicesController>(ServicesController);
    service = module.get<ServicesService>(ServicesService);
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

  describe('getServices', () => {
    it('should return services', async () => {
      const data: Service[] = [
        {
          id: uuidv4(),
          name: 'test',
          actions: [],
        },
      ];

      jest.spyOn(service, 'getServices').mockImplementation(() => data);

      const result = controller.getServices();

      expect(result[0].name).toBe(data[0].name);
    });
  });
});
