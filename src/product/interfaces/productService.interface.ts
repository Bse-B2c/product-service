import { Product } from '@product/entity/product.entity';
import { ProductDto } from '@product/dtos/product.dto';

export interface ProductService {
	create(product: ProductDto): Promise<Product>;
}
