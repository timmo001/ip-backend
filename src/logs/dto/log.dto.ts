import { IsNotEmpty } from 'class-validator';

export class LogDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  level: string;

  @IsNotEmpty()
  type: string;

  createdOn?: Date;
}
