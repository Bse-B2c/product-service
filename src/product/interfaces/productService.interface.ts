import { Product } from '@product/entity/product.entity';
import { ProductDto } from '@product/dtos/product.dto';
import { SearchDto } from '@product/dtos/search.dto';

export interface ProductService {
	create(product: ProductDto): Promise<Product>;
	findOne(id: number): Promise<Product>;
	delete(id: number): Promise<Product>;
	update(id: number, product: ProductDto): Promise<Product>;
	find(search: SearchDto): Promise<Array<Product>>;
}
