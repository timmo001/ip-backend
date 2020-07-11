import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

const config = new ConfigService().getConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  await app.listen(config.backend.api_port);
}
bootstrap();
