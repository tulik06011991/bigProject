import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { auth } from '../auth/entities/auth.entity';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(auth.name) private userModel: Model<auth>,
    private jwtService: JwtService,
  ) {}

  // Foydalanuvchini ro'yxatdan o'tkazish
  async register(createUserDto: CreateAuthDto): Promise<auth> {
    const { email, password, name } = createUserDto;

    // Emailni tekshirish
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      this.logger.warn(`User with email ${email} already exists`);
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Parolni shifrlash
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      email,
      password: hashedPassword,
      name,
    });

    try {
      await newUser.save();
      this.logger.log(`User registered with email: ${email}`);
      return newUser;
    } catch (error) {
      this.logger.error('Registration failed', error.stack);
      throw new HttpException(
        'Failed to register user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Tizimga kirish (login) va JWT yaratish
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    // Foydalanuvchini tekshirish
    const auth = await this.userModel.findOne({ email });
    if (!auth) {
      this.logger.warn(`Auth not found for email: ${email}`);
      throw new HttpException(
        'Invalid credentials: User not found',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Parolni tekshirish
    const isMatch = await bcrypt.compare(password, auth.password);
    if (!isMatch) {
      this.logger.warn(`Invalid credentials for email: ${email}`);
      throw new HttpException(
        'Invalid credentials: Incorrect password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // JWT tokenini yaratish
    const payload = { email: auth.email, sub: auth._id };
    const token = this.jwtService.sign(payload);

    this.logger.log(`User logged in with email: ${email}`);
    return { access_token: token };
  }
}
