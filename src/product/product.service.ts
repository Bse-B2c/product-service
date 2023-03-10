import { ProductService as Service } from '@product/interfaces/productService.interface';
import { ProductDto } from '@product/dtos/product.dto';
import { Product } from '@product/entity/product.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';

export class ProductService implements Service {
	constructor(private repository: Repository<Product>) {}

	create = async ({
		name,
		images,
		description,
		releaseDate,
		categoryId,
		price,
	}: ProductDto): Promise<Product> => {
		const product = await this.repository.findOne({ where: { name } });

		if (product)
			throw new HttpException({
				statusCode: HttpStatusCode.CONFLICT,
				message: `The product already exists`,
			});

		const newProduct = await this.repository.create({
			name,
			images,
			description,
			releaseDate,
			categoryId,
			price,
		});

		return this.repository.save(newProduct);
	};

	findOne = async (id: number): Promise<Product> => {
		const product = await this.repository.findOne({
			relations: { discount: true },
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
