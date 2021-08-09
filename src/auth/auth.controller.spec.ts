import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { v4 as uuidv4 } from "uuid";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { ConfigService } from "../config/config.service";
import { JwtStrategy } from "./jwt.strategy";
import { UserDto } from "../users/dto/user.dto";
import { UserEntity } from "../users/entity/user.entity";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";

const config = new ConfigService().getConfig();

describe("AuthController", () => {
  let controller: AuthController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
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
        TypeOrmModule.forFeature([UserEntity]),
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
      providers: [AuthService, JwtStrategy],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe("controller", () => {
    it("should be defined", () => {
      expect(controller).toBeDefined();
    });
  });

  describe("usersService", () => {
    it("should be defined", () => {
      expect(usersService).toBeDefined();
    });
  });

  describe("login", () => {
    it("should return login", async () => {
      const data: UserDto = {
        id: uuidv4(),
        username: "test",
        email: "test@example.com",
        firstName: "testfirstname",
        lastName: "testlastname",
        createdOn: new Date(),
      };

      jest
        .spyOn(usersService, "findByLogin")
        .mockImplementation(async () => data);

      const loginResult = await controller.login({
        username: data.username,
        password: "test1234",
      });

      expect(loginResult.username).toBe(data.username);
    });
  });
});
