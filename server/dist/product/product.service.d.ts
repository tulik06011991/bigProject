import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
export declare class ProductsService {
    private productModel;
    constructor(productModel: Model<Product>);
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    create(createProductDto: any): Promise<Product>;
    update(id: string, updateProductDto: any): Promise<Product>;
    remove(id: string): Promise<void>;
}
