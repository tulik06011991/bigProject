// src/products/products.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '../products/entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Barcha mahsulotlarni olish
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  // Mahsulotni yaratish
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  // Mahsulotni ID bo'yicha olish
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  // Mahsulotni yangilash
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  // Mahsulotni o'chirish
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(id);
  }
}
