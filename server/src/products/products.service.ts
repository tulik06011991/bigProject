// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
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
    return this.productModel.find().exec();
  }

  // Mahsulotni ID bo'yicha olish
  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  // Mahsulotni yangilash
  async update(id: string, updateProductDto: CreateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, {
      new: true, // Yangilangan qiymatni qaytarish
    }).exec();
  }

  // Mahsulotni o'chirish
  async remove(id: string): Promise<any> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
