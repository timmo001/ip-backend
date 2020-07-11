import { Test, TestingModule } from '@nestjs/testing';

import { ConfigController } from './config.controller';
import { ConfigService } from './config.service';

describe('ConfigController', () => {
  let event: TestingModule;

  beforeAll(async () => {
    event = await Test.createTestingModule({
      controllers: [ConfigController],
      providers: [ConfigService],
    }).compile();
  });
});
