import { Module } from '@nestjs/common';

import { AuthModule } from '../../auth/auth.module';
import { ConfigModule } from '../../config/config.module';
import { EventTriggerController } from './trigger.controller';
import { EventTriggerService } from './trigger.service';
import { UsersModule } from '../../users/users.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
  ],
  controllers: [EventTriggerController],
  providers: [EventTriggerService],
  exports: [EventTriggerService],
})
export class EventTriggerModule {}
