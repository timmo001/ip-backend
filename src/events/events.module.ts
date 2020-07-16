import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '../config/config.module';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
