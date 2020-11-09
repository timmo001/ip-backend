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
  published: boolean;

  @IsNotEmpty()
  profiles: string;

  createdOn?: Date;

  updatedOn?: Date;
}
