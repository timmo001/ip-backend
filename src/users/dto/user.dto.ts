import { IsNotEmpty, IsEmail } from "class-validator";

export class UserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstName: string;

  lastName: string;

  createdOn?: Date;
}
