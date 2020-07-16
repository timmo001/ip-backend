import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { ConfigController } from './config.controller';
import { ConfigService } from './config.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [ConfigController],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
