import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { EndpointEntity } from "./entity/endpoint.entity";
import { EndpointsModule } from "./endpoints.module";
import { EndpointsService } from "./endpoints.service";
import { UserEntity } from "../users/entity/user.entity";

const config = new ConfigService().getConfig();

describe("EndpointsService", () => {
  let service: EndpointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "mariadb",
          host: config.database.host,
          port: config.database.port,
          username: config.database.username,
          password: config.database.password,
          database: config.database.database,
          entities: [EndpointEntity, UserEntity],
          keepConnectionAlive: true,
        }),
        TypeOrmModule.forFeature([EndpointEntity]),
        ConfigModule,
        EndpointsModule,
      ],
      providers: [EndpointsService],
    }).compile();

    service = module.get<EndpointsService>(EndpointsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
