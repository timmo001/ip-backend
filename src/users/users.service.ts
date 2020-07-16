import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';

import { comparePasswords } from '../shared/utils';
import { CreateUserDto } from './dto/user.create.dto';
import { JwtPayload } from '../auth/interfaces/payload.interface';
import { LoginUserDto } from './dto/user.login.dto';
import { toUserDto } from '../shared/mapper';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>
  ) {}

  async findOne(options?: FindOneOptions<UserEntity>): Promise<UserDto> {
    const user = await this.userRepo.findOne(options);
    return toUserDto(user);
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepo.findOne({ where: { username } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return toUserDto(user);
  }

  async findByPayload({ username }: JwtPayload): Promise<UserDto> {
    return await this.findOne({ where: { username } });
  }

  async create(userDto: CreateUserDto): Promise<UserDto> {
    // check if the user exists in the db
    const userInDb = await this.userRepo.findOne({
      where: { username: userDto.username },
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: UserEntity = this.userRepo.create(userDto);

    await this.userRepo.save(user);

    return toUserDto(user);
  }
}
