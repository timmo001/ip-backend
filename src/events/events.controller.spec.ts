import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { EventDto } from './dto/event.dto';
import { EventEntity } from './entity/event.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { UserEntity } from '../users/entity/user.entity';
import { UsersModule } from '../users/users.module';

const config = new ConfigService().getConfig();

describe('EventsController', () => {
  let controller: EventsController;
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      imports: [
        ConfigModule,
        TypeOrmModule.forRoot({
          type: 'mariadb',
          host: config.database.host,
          port: config.database.port,
          username: config.database.username,
          password: config.database.password,
          database: config.database.database,
          entities: [EventEntity, UserEntity],
          keepConnectionAlive: true,
        }),
        TypeOrmModule.forFeature([EventEntity]),
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
      providers: [EventsService],
    }).compile();

    controller = module.get<EventsController>(EventsController);
    service = module.get<EventsService>(EventsService);
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

  describe('getEvents', () => {
    it('should return events', async () => {
      const data: EventDto[] = [
        {
          id: uuidv4(),
          service: 'test',
          endpoint: 'test',
          status: 'success',
        },
      ];

      jest.spyOn(service, 'find').mockImplementation(async () => data);

      const result = await controller.getEvents();

      expect(result).toBe(data);
    });
  });
});
