import { Test, TestingModule } from '@nestjs/testing';

import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsController', () => {
  let event: TestingModule;

  beforeAll(async () => {
    event = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [EventsService],
    }).compile();
  });
});
