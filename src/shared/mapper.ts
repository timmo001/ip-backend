import { UserDto } from '../users/dto/user.dto';
import { UserEntity } from '../users/entity/user.entity';

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, username, email } = data;

  const userDto: UserDto = {
    id,
    username,
    email,
  };

  return userDto;
};
