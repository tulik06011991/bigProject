import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): any;
    findAll(): any;
    findOne(id: string): any;
    update(id: string, updateProductDto: UpdateProductDto): any;
    remove(id: string): any;
}
