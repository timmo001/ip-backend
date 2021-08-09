import { IsNotEmpty } from "class-validator";

export class EndpointDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  endpoint: string;

  @IsNotEmpty()
  service: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  resultOnly: boolean;

  @IsNotEmpty()
  logLevel: "debug" | "info" | "warn" | "error";

  @IsNotEmpty()
  supportedMethods: string;

  @IsNotEmpty()
  published: boolean;

  createdOn?: Date;

  updatedOn?: Date;
}
