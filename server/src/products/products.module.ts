import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductSchema } from './entities/product.entity';
import { MulterModule } from '@nestjs/platform-express'; // MulterModule ni import qilish
import { diskStorage } from 'multer'; // diskStorage funksiyasini import qilish
import * as path from 'path'; // Fayl saqlash joyi uchun path moduli
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    // MongoDB uchun Mongoose modulini sozlash
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),

    // Multer moduli: Fayllarni yuklash uchun sozlash
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploads'), // uploads papkasini statik qilib ulash
      serveRoot: '/uploads', // Frontendga `/uploads` orqali kirish imkoniyatini berish
    }),
    MulterModule.register({ 
      storage: diskStorage({
        destination: './uploads', // uploads papkasiga yozish
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = path.extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`); // Fayl nomini yarating!
        },
      }),
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
