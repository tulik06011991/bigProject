import { Controller, Post, Body, UploadedFile, UseInterceptors, Get, NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'; // Multer Interceptor
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const imageUrl = image ? `${image.filename}` : ''; // Fayl yo'lini olish
    const product = await this.productService.create({
      ...createProductDto,
      imageUrl,
    });
    return product;
  }
  

  @Get()
  async findAll() {
    const products = await this.productService.findAll(); // Servis orqali mahsulotlarni olish

    if (!products || products.length === 0) {
      throw new NotFoundException('Mahsulotlar topilmadi'); // Agar mahsulotlar bo'lmasa, xato qaytarish
    }

    return products; // Mahsulotlar ro'yxatini qaytarish
  }
}
