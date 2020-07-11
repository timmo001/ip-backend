import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UsersModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
