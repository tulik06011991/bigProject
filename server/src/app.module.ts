import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis.module';  // Redis modulini o'zingiz yaratishingiz kerak
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    // MongoDB uchun Mongoose modulini sozlash
    MongooseModule.forRoot('mongodb+srv://baliq06011991:baliq06011991@cluster0.r0dht.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),

    // Redis moduli (ioredis bilan yaratilgan)
    RedisModule,  // O'zingiz yaratgan Redis modulini import qilish

    // Auth moduli
    AuthModule, ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
