import { DiscountService as Service } from '@discount/interfaces/discountService.interface';
import { Repository } from 'typeorm';
import { Discount } from '@discount/entity/discount.entity';
import { DiscountDto } from '@discount/dtos/discount.dto';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';

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
}
