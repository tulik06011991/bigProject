import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { auth } from '../auth/entities/auth.entity';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(auth.name) private userModel: Model<auth>,
    private jwtService: JwtService,
  ) {}

  // Foydalanuvchini ro'yxatdan o'tkazish
  async register(createUserDto: CreateAuthDto): Promise<auth> {
    const { email, password, name } = createUserDto;

    // Parolni shifrlash
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      email,
      password: hashedPassword,
      name,
    });

    return newUser.save();
  }

  // Tizimga kirish (login) va JWT yaratish
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const auth = await this.userModel.findOne({ email });

    if (!auth) {
      throw new Error('auth not found');
    }

    // Parolni tekshirish
    const isMatch = await bcrypt.compare(password, auth.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // JWT tokenini yaratish
    const payload = { email: auth.email, sub: auth._id };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
