import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ApiModule } from "./api/api.module";
import { AppController } from "./app.controller";
import { AppGateway } from "./app.gateway";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "./config/config.module";
import { ConfigService } from "./config/config.service";
import { EndpointsModule } from "./endpoints/endpoints.module";
import { EventsModule } from "./events/events.module";
import { EventTriggerModule } from "./events/trigger/trigger.module";
import { LogsModule } from "./logs/logs.module";
import { ServicesModule } from "./services/services.module";
import { UsersModule } from "./users/users.module";

const config = new ConfigService().getConfig();

@Module({
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot({
      ...config.database,
      autoLoadEntities: true,
      logging: false,
      synchronize: true,
    }),
    ApiModule,
    AuthModule,
    ConfigModule,
    EndpointsModule,
    EventsModule,
    EventTriggerModule,
    LogsModule,
    ServicesModule,
    UsersModule,
  ],
  providers: [AppGateway, AppService],
})
export class AppModule {}
