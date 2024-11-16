import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '../products/entities/product.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<Product[]>;
    create(createProductDto: CreateProductDto): Promise<Product>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: CreateProductDto): Promise<Product>;
    remove(id: string): Promise<void>;
}
