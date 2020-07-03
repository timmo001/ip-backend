import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
// import { AuthService } from './auth/auth.service';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
// import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    // private authService: AuthService,
    private readonly appService: AppService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getApp();
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
