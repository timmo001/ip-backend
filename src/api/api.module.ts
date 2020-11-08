import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '../config/config.module';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule],
  controllers: [ApiController],
  providers: [ApiService],
  exports: [ApiService],
})
export class ApiModule {}
