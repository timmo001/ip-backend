import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ConfigModule } from "../../config/config.module";
import { ConfigService } from "../../config/config.service";
import { EventTriggerController } from "./trigger.controller";
import { EventTriggerService } from "./trigger.service";
import { UserEntity } from "../../users/entity/user.entity";
import { UsersModule } from "../../users/users.module";
import ApiResponse from "../../types/ApiResponse";

const config = new ConfigService().getConfig();

describe("EventTriggerController", () => {
  let controller: EventTriggerController;
  let service: EventTriggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventTriggerController],
      imports: [
        ConfigModule,
        TypeOrmModule.forRoot({
          type: "mariadb",
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
          defaultStrategy: "jwt",
          property: "user",
          session: false,
        }),
        UsersModule,
      ],
      providers: [EventTriggerService],
    }).compile();

    controller = module.get<EventTriggerController>(EventTriggerController);
    service = module.get<EventTriggerService>(EventTriggerService);
  });

  describe("controller", () => {
    it("should be defined", () => {
      expect(controller).toBeDefined();
    });
  });

  describe("service", () => {
    it("should be defined", () => {
      expect(service).toBeDefined();
    });
  });

  describe("getEventTrigger", () => {
    it("should return eventtrigger", async () => {
      const data: ApiResponse = { response: {}, request: {} };

      jest.spyOn(service, "sendEvent").mockImplementation(async () => data);

      const result = await controller.postEvent({}, {}, {});

      expect(result).toBe(data);
    });
  });
});
