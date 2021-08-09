import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { EventEntity } from "./entity/event.entity";
import { EventsModule } from "./events.module";
import { EventsService } from "./events.service";
import { UserEntity } from "../users/entity/user.entity";

const config = new ConfigService().getConfig();

describe("EventsService", () => {
  let service: EventsService;

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
          entities: [EventEntity, UserEntity],
          keepConnectionAlive: true,
        }),
        TypeOrmModule.forFeature([EventEntity]),
        ConfigModule,
        EventsModule,
      ],
      providers: [EventsService],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
