import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as cors from 'cors';

import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

const config = new ConfigService().getConfig();

const logger: Logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(cors());

  await app.listen(config.backend.api_port);
  logger.log(`Server running on port ${config.backend.api_port}`);
}
bootstrap();
