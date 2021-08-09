import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getApp(): string {
    return "This is a template for the main application";
  }
}
