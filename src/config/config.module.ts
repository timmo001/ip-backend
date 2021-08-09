import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { ConfigController } from "./config.controller";
import { ConfigService } from "./config.service";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    AuthModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    UsersModule,
  ],
  controllers: [ConfigController],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
