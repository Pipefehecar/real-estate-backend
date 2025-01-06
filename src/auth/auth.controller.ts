import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserCreateDto, UserLoginDto } from './dtos';
import { AuthService } from './services/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  create(@Body() userCreateDto: UserCreateDto) {
    return this.authService.create(userCreateDto);
  }

  @Post('/login')
  login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }

  @Get('/me')
  @UseGuards( AuthGuard() )
  getMe() {
    return 'Hola mundo private';
  }
}
