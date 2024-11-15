import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS ni yoqish
  app.enableCors({
    origin: 'http://localhost:3000', // Frontendning URL manzili (masalan, React yoki Next.js serveri)
    methods: 'GET,POST,PUT,DELETE',  // Qabul qilinadigan HTTP metodlari
    allowedHeaders: 'Content-Type, Authorization', // Ruxsat etilgan headerlar
  });

  await app.listen(4000); // Backendni 3000-portda ishga tushirish
}

bootstrap();
