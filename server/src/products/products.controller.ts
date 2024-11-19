import { Controller, Post, Body, UploadedFile, UseInterceptors, HttpException, HttpStatus,  Get, Param, NotFoundException, Delete } from '@nestjs/common';
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

    const imageUrl = image ? `${image.filename}` : ''; // Faylni saqlash joyi

    // Mahsulotni yaratish

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


  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.productService.remove(id); // findByIdAndDelete emas, remove chaqiriladi
    return { message: 'Item deleted successfully' };
  }
  
  
}


// async remove(id: string): Promise<void> {
//   const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
//   if (!deletedProduct) {
//     throw new NotFoundException(`Mahsulot ID ${id} topilmadi`);
//   }
// }
