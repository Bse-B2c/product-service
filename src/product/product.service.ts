import { ProductService as Service } from '@product/interfaces/productService.interface';
import { ProductDto } from '@product/dtos/product.dto';
import { Product } from '@product/entity/product.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';
import { DiscountService } from '@discount/interfaces/discountService.interface';
import { InventoryService } from '@inventory/interfaces/inventoryService.interface';

export class ProductService implements Service {
	constructor(
		private repository: Repository<Product>,
		private discountService: DiscountService,
		private inventoryService: InventoryService
	) {}

	create = async ({
		name,
		images,
		description,
		releaseDate,
		categoryId,
		discountId,
		price,
		quantity,
	}: ProductDto): Promise<Product> => {
		const product = await this.repository.findOne({ where: { name } });
		let discount = null;
		let inventory = null;

		if (product)
			throw new HttpException({
				statusCode: HttpStatusCode.CONFLICT,
				message: `The product already exists`,
			});

		if (discountId) discount = await this.discountService.findOne(discountId);

		if (quantity) inventory = await this.inventoryService.create(quantity);

		const newProduct = this.repository.create({
			name,
			images,
			description,
			releaseDate,
			categoryId,
			price,
			discount,
			inventory,
		});

		return this.repository.save(newProduct);
	};

	findOne = async (id: number): Promise<Product> => {
		const product = await this.repository.findOne({
			relations: { discount: true, specifications: true },
			where: { id },
		});

		if (!product)
			throw new HttpException({
				statusCode: HttpStatusCode.NOT_FOUND,
				message: `Product ${id} not found`,
			});

		return product;
	};

	delete = async (id: number): Promise<Product> => {
		const product = await this.findOne(id);

		await this.repository.delete(id);

		return product;
	};
}
