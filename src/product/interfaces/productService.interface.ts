import { Product } from '@product/entity/product.entity';
import { ProductDto } from '@product/dtos/product.dto';

export interface ProductService {
	create(product: ProductDto): Promise<Product>;
	findOne(id: number): Promise<Product>;
	delete(id: number): Promise<Product>;
	update(id: number, product: ProductDto): Promise<Product>;
}
