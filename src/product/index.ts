import { ProductController } from '@src/product/product.controller';
import { dataSource } from '@src/database';
import { Product } from '@product/entity/product.entity';
import { ProductService } from '@product/product.service';
import { discountService } from '@src/discount';
import { inventoryService } from '@src/inventory';

const repository = dataSource.getRepository(Product);
export const productService = new ProductService(
	repository,
	discountService,
	inventoryService
);
export const productController = new ProductController(productService);
