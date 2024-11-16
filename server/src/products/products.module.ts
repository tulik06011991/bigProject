import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductSchema } from './entities/product.entity';
import { MulterModule } from '@nestjs/platform-express';  // MulterModule ni import qilish
import * as path from 'path';  // Fayl saqlash joyi uchun path moduli

@Module({
  imports: [
    // MongoDB uchun Mongoose modulini sozlash
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),

    // Multer moduli: Fayllarni yuklash uchun sozlash
    MulterModule.register({
      dest: path.join(__dirname, '..', 'uploads'), // Fayllarni saqlash joyi
      limits: {
        fileSize: 10 * 1024 * 1024, // Maksimal fayl hajmi (10MB)
      },
      fileFilter: (req, file, cb) => {
        // Faqat rasm fayllarini qabul qilish
        if (!file.mimetype.startsWith('image/')) {
          return cb(new Error('Faqat rasm fayllarini yuklash mumkin!'), false);
        }
        cb(null, true); // Faylni qabul qilish
      },
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
