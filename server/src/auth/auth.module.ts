import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '../redis.module';  // RedisModule import qilinadi
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { auth, authSchema } from './entities/auth.entity';  // `auth` va `AuthSchema` to'g'ri import qilinsin

@Module({
  imports: [
    MongooseModule.forFeature([{ name: auth.name, schema: authSchema }]),  // MongoDB uchun Mongoose moduli
    JwtModule.register({
      secret: 'your-jwt-secret',  // O'zgaruvchilarni xavfsiz saqlang
      signOptions: { expiresIn: '1h' },
    }),
    RedisModule,  // Redis modulini qo'shamiz
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
