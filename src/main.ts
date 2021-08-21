import { config as dotenv } from "dotenv";
import { existsSync, mkdirSync } from "fs";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import cors from "cors";
import helmet from "helmet";

import { AppModule } from "./app.module";
import { ConfigService } from "./config/config.service";
import { getAppDataDirectory } from "./shared/utils";

const config = new ConfigService().getConfig();

const logger: Logger = new Logger("Main");

async function bootstrap() {
  // Setup app data directory
  const dir = getAppDataDirectory();
  if (!existsSync(dir)) mkdirSync(dir);

  const app = await NestFactory.create(AppModule);

  app.use(cors());
  app.use(helmet());

  const options = new DocumentBuilder()
    .setTitle("ip")
    .setDescription("Lorem Ipsum")
    .setVersion("1.0.0")
    .addTag("ip")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("docs", app, document);

  await app.listen(config.backend.api_port);
  logger.log(`Server running on port ${config.backend.api_port}`);
}

dotenv();
bootstrap();
