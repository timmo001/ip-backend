import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe("getHello", () => {
    it('should return "This is a template for the main application"', () => {
      const appController = module.get<AppController>(AppController);
      expect(appController.getApp()).toBe(
        "This is a template for the main application"
      );
    });
  });
});
