import { IsNotEmpty } from 'class-validator';

export class EventDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  service: string;

  endpoint: string;

  @IsNotEmpty()
  status: string;

  createdOn?: Date;

  updatedOn?: Date;

  completedOn?: Date;

  message?: string;
}
