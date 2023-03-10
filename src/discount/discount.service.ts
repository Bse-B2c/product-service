import { DiscountService as Service } from '@discount/interfaces/discountService.interface';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { Discount } from '@discount/entity/discount.entity';
import { DiscountDto } from '@discount/dtos/discount.dto';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';
import { SearchDto } from '@discount/dtos/search.dto';

export class DiscountService implements Service {
	constructor(private repository: Repository<Discount>) {}

	create = async ({
		name,
		active,
		discountPercent,
	}: DiscountDto): Promise<Discount> => {
		const discount = await this.repository.findOne({ where: { name } });

		if (discount)
			throw new HttpException({
				statusCode: HttpStatusCode.CONFLICT,
				message: `The discount already exists`,
			});

		const newDiscount = this.repository.create({
			name,
			active: active ?? false,
			discountPercent,
		});

		return this.repository.save(newDiscount);
	};

	findOne = async (id: number): Promise<Discount> => {
		const discount = await this.repository.findOne({ where: { id } });

		if (!discount)
			throw new HttpException({
				statusCode: HttpStatusCode.NOT_FOUND,
				message: `Discount ${id} not found`,
			});

		return discount;
	};

	delete = async (id: number): Promise<Discount> => {
		const discount = await this.findOne(id);

		await this.repository.delete(id);

		return discount;
	};

	update = async (
		id: number,
		{ name, active, discountPercent }: DiscountDto
	): Promise<Discount> => {
		const discount = await this.findOne(id);

		Object.assign(discount, { name, active, discountPercent });

		return this.repository.save(discount);
	};

	find = async (search: SearchDto): Promise<Array<Discount>> => {
		const {
			name,
			sortOrder = 'ASC',
			orderBy = 'name',
			page = 0,
			limit = 10,
		} = search;
		let where: FindOptionsWhere<Discount> = {};

		if (name) where = { ...where, name: ILike(name) };

		return this.repository.find({
			relations: { product: true },
			loadRelationIds: true,
			where,
			order: { [orderBy]: sortOrder },
			take: limit,
			skip: limit * page,
		});
	};
}
