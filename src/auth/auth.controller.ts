import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/user.create.dto';
import { JwtPayload } from './interfaces/payload.interface';
import { LoginStatus } from './interfaces/login-status.interface';
import { LoginUserDto } from '../users/dto/user.login.dto';
import { RegistrationStatus } from './interfaces/regisration-status.interface';
import { UserEntity } from '../users/entity/user.entity';

interface RequestExt extends Request {
  user: UserEntity;
}

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDto
    );

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }

  @Get('user')
  @UseGuards(AuthGuard())
  public async testAuth(@Req() req: RequestExt): Promise<JwtPayload> {
    return req.user;
  }
}
