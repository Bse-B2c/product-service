import { ProductService as Service } from '@product/interfaces/productService.interface';
import { ProductDto } from '@product/dtos/product.dto';
import { Product } from '@product/entity/product.entity';
import {
	Between,
	FindOptionsWhere,
	ILike,
	In,
	LessThanOrEqual,
	MoreThanOrEqual,
	Repository,
} from 'typeorm';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';
import { DiscountService } from '@discount/interfaces/discountService.interface';
import { InventoryService } from '@inventory/interfaces/inventoryService.interface';
import { SearchDto } from '@product/dtos/search.dto';

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
			relations: {
				discount: true,
				specifications: true,
				inventory: { activities: true },
			},
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

	update = async (
		id: number,
		{ quantity, discountId, ...updateProduct }: ProductDto
	): Promise<Product> => {
		const product = await this.findOne(id);
		let inventory;
		let discount;

		if (quantity !== product.inventory?.quantity)
			inventory = await this.inventoryService.update(
				product.inventory?.id as number,
				{ quantity, author: '' }
			);

		if (discountId) discount = await this.discountService.findOne(discountId);

		Object.assign(product, { ...updateProduct, inventory, discount });

		return this.repository.save(product);
	};

	find = async (search: SearchDto): Promise<Array<Product>> => {
		const {
			ids,
			name,
			description,
			categories,
			startPrice,
			endPrice,
			sortOrder = 'ASC',
			orderBy = 'name',
			page = 0,
			limit = 10,
		} = search;
		let where: FindOptionsWhere<Product> = {};

		if (ids) where = { ...where, id: In(ids) };

		if (name) where = { ...where, name: ILike(`%${name}%`) };

		if (categories) where = { ...where, categoryId: In(categories) };

		if (description)
			where = { ...where, description: ILike(`%${description}%`) };

		if (startPrice && endPrice) {
			where = {
				...where,
				price: Between(startPrice, endPrice),
			};
		} else if (startPrice) {
			where = {
				...where,
				price: MoreThanOrEqual(startPrice),
			};
		} else if (endPrice) {
			where = {
				...where,
				price: LessThanOrEqual(endPrice),
			};
		}

		return this.repository.find({
			relations: { discount: true, inventory: true },
			where,
			order: { [orderBy]: sortOrder },
			take: limit,
			skip: limit * page,
		});
	};
}
