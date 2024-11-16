import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service'; 
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image')) // Image faylni qabul qilish
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const imageUrl = image ? `uploads/${image.filename}` : '';

    const product = await this.productService.create({
      ...createProductDto,
      imageUrl,
    });

    return product; // Yaratilgan mahsulotni qaytarish
  }
}
