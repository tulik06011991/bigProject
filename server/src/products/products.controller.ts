import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'; // Multer Interceptor
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))  // Multer interceptorini ishlatish
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,  // Uploaded fayl
  ) {
    const imageUrl = image ? `uploads/${image.filename}` : '';  // Faylni saqlash joyi

    // Mahsulotni yaratish
    const product = await this.productService.create({
      ...createProductDto,
      imageUrl,
    });

    return product; // Yaratilgan mahsulotni qaytarish
  }
}
