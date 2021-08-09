import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { v4 as uuidv4 } from "uuid";

import { readYAML } from "../shared/utils";
import { ConfigController } from "./config.controller";
import { ConfigModule } from "./config.module";
import { ConfigService } from "./config.service";
import { UserEntity } from "../users/entity/user.entity";
import { UsersModule } from "../users/users.module";
import Config from "../types/Config";

const config = new ConfigService().getConfig();

describe("ConfigController", () => {
  let controller: ConfigController;
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigController],
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
      providers: [ConfigService],
    }).compile();

    controller = module.get<ConfigController>(ConfigController);
    service = module.get<ConfigService>(ConfigService);
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

  describe("getConfig", () => {
    it("should return config", async () => {
      const data: Config = readYAML("../core/ip_config.yaml");

      jest.spyOn(service, "getConfig").mockImplementation(() => data);

      const result = controller.getConfig();

      expect(result).toBe(data);
    });
  });
});
