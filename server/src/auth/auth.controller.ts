import { Controller, Post, Body, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  // Foydalanuvchini ro'yxatdan o'tkazish
  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto) {
    try {
      const user = await this.authService.register(createAuthDto);
      return {
        message: 'Registration successful',
        data: user,
      };
    } catch (error) {
      this.logger.error('Registration failed', error.stack);
      throw new HttpException(
        { message: 'Registration failed', error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Tizimga kirish (login)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const result = await this.authService.login(loginUserDto);
      return result;  // JWT tokenini qaytarish
    } catch (error) {
      this.logger.error('Login failed', error.stack);
      throw new HttpException(
        { message: 'Login failed', error: error.message },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
