import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '../config/config.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';

const config = new ConfigService().getConfig();

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: config.backend.secret,
      signOptions: {
        expiresIn: config.backend.token_expiry,
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
