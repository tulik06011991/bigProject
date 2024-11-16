import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { MulterModule } from '@nestjs/platform-express';
import * as path from 'path';

@Module({
  imports: [
    // MulterModuleni sozlash
    MulterModule.register({
      dest: path.join(__dirname, '..', 'uploads'), // Fayllarni saqlash joyi
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class AppModule {}
