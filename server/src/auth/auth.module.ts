import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { auth, authSchema } from './entities/auth.entity'; // `auth` va `AuthSchema` to'g'ri import qilinsin
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // Mongoose orqali `auth` modelini import qilish
    MongooseModule.forFeature([{ name: auth.name, schema: authSchema }]),

    // JWT moduli
    JwtModule.register({
      secret: 'your-jwt-secret',  // O'zgaruvchilarni xavfsiz saqlang
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

