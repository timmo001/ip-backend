import { IsNotEmpty } from 'class-validator';

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
  profiles: string;

  @IsNotEmpty()
  logLevel: 'debug' | 'info' | 'warn' | 'error';

  @IsNotEmpty()
  published: boolean;

  createdOn?: Date;

  updatedOn?: Date;
}
