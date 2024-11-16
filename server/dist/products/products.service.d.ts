import { Model } from 'mongoose';
import { Product } from '../products/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductsService {
    private readonly productModel;
    constructor(productModel: Model<Product>);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: CreateProductDto): Promise<Product>;
    remove(id: string): Promise<any>;
}
