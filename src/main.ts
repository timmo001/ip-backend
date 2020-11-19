import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

const config = new ConfigService().getConfig();

const logger: Logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());
  app.use(helmet());

  const options = new DocumentBuilder()
    .setTitle('UPaaS')
    .setDescription('Lorem Ipsum')
    .setVersion('1.0.0')
    .addTag('upaas')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.backend.api_port);
  logger.log(`Server running on port ${config.backend.api_port}`);
}
bootstrap();
