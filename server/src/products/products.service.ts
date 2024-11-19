import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../products/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  // Mahsulot qo'shish
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  // Barcha mahsulotlarni olish
  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    if (!products || products.length === 0) {
      throw new NotFoundException('Mahsulotlar topilmadi');
    }
    return products;
  }

  // Mahsulotni ID bo'yicha olish
  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Mahsulot ID ${id} topilmadi`);
    }
    return product;
  }

  // Mahsulotni yangilash
  async update(id: string, updateProductDto: CreateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true }, // Yangilangan qiymatni qaytarish
    ).exec();
    if (!updatedProduct) {
      throw new NotFoundException(`Mahsulot ID ${id} topilmadi`);
    }
    return updatedProduct;
  }

  // Mahsulotni o'chirish
  async remove(id: string): Promise<void> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!deletedProduct) {
      throw new NotFoundException(`Mahsulot ID ${id} topilmadi`);
    }
  }
}
