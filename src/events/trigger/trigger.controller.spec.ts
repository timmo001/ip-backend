import { Test, TestingModule } from '@nestjs/testing';

import { EventTriggerController } from './trigger.controller';
import { EventTriggerService } from './trigger.service';

describe('EventTriggerController', () => {
  let event: TestingModule;

  beforeAll(async () => {
    event = await Test.createTestingModule({
      controllers: [EventTriggerController],
      providers: [EventTriggerService],
    }).compile();
  });
});
