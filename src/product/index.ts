import { ProductController } from '@src/product/product.controller';
import { dataSource } from '@src/database';
import { Product } from '@product/entity/product.entity';
import { ProductService } from '@product/product.service';
import { discountService } from '@src/discount';

const repository = dataSource.getRepository(Product);
export const productService = new ProductService(repository, discountService);
export const productController = new ProductController(productService);
