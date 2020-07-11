import { Test, TestingModule } from '@nestjs/testing';

import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';

describe('ServicesController', () => {
  let event: TestingModule;

  beforeAll(async () => {
    event = await Test.createTestingModule({
      controllers: [ServicesController],
      providers: [ServicesService],
    }).compile();
  });
});
