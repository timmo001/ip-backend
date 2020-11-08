import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { EventsModule } from './events/events.module';
import { ServicesModule } from './services/services.module';
import { UsersModule } from './users/users.module';
import { ApiModule } from './api/api.module';

const config = new ConfigService().getConfig();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.database,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    ConfigModule,
    EventsModule,
    ServicesModule,
    UsersModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppGateway, AppService],
})
export class AppModule {}
