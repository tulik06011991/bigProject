import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Foydalanuvchini ro'yxatdan o'tkazish
  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto) {
    try {
      return await this.authService.register(createAuthDto);
    } catch (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  }

  // Tizimga kirish (login)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      return await this.authService.login(loginUserDto);
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }
}
