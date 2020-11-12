import { Module } from '@nestjs/common';

import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '../config/config.module';
import { EndpointsModule } from 'src/endpoints/endpoints.module';
import { EventsModule } from 'src/events/events.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    EndpointsModule,
    EventsModule,
    UsersModule,
  ],
  controllers: [ApiController],
  providers: [ApiService],
  exports: [ApiService],
})
export class ApiModule {}