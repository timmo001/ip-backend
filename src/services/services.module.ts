import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '../config/config.module';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
