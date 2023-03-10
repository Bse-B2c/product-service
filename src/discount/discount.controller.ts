import { DiscountService } from '@discount/interfaces/discountService.interface';
import { NextFunction, Request, Response } from 'express';
import { DiscountDto } from '@discount/dtos/discount.dto';
import { HttpStatusCode } from '@bse-b2c/common';

export class DiscountController {
	constructor(private service: DiscountService) {}

	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { name, discountPercent, active } =
				req.body as unknown as DiscountDto;

			const response = await this.service.create({
				name,
				discountPercent,
				active,
			});

			return res.status(HttpStatusCode.CREATED).send({
				statusCode: HttpStatusCode.CREATED,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};
}