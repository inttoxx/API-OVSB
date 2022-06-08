import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  signUp(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
