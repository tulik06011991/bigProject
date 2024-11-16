import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductsController {
    private readonly productService;
    constructor(productService: ProductsService);
    create(createProductDto: CreateProductDto, image: Express.Multer.File): Promise<import("./entities/product.entity").Product>;
    findAll(): Promise<import("./entities/product.entity").Product[]>;
}
