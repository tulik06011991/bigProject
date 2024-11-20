// src/app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { join } from 'path';
import { CacheMiddleware } from './cache.middleware'; // Middleware'ni import qilish
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis.module';
import { ProductsModule } from './products/products.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    // MongoDB uchun Mongoose modulini sozlash
    MongooseModule.forRoot(
      'mongodb+srv://baliq06011991:baliq06011991@cluster0.r0dht.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{

        connectTimeoutMS: 30000
      }

    ),

    // Redis moduli
    RedisModule,

    // Auth moduli
    AuthModule,

    // Mahsulotlar moduli
    ProductsModule,

    // Multer moduli: Fayllarni yuklash uchun sozlash
    MulterModule.register({

      dest: path.join(__dirname, '..', 'upload'), // Fayllar saqlanadigan papka

    }),

    // ServeStatic moduli: Statik fayllar xizmatini qo'shish
    ServeStaticModule.forRoot({

      rootPath: join(__dirname, '..', 'uploads'),  // Fayllar joylashgan papka
      serveRoot: '/files', // URL prefiksi (http://localhost:4000/files)

    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // '/files' yo'nalishidagi barcha so'rovlar uchun CacheMiddleware'ni ishlatish
    consumer.apply(CacheMiddleware).forRoutes('*'); // Yoki faqat '/files/*' deb ham yozishingiz mumkin
  }
}
