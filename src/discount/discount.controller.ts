import { DiscountService } from '@discount/interfaces/discountService.interface';
import { NextFunction, Request, Response } from 'express';
import { DiscountDto } from '@discount/dtos/discount.dto';
import { HttpStatusCode } from '@bse-b2c/common';
import { ParamsDto } from '@common/dtos/params.dto';
import { SearchDto } from '@discount/dtos/search.dto';

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

	findOne = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params as unknown as ParamsDto;

			const response = await this.service.findOne(id);

			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};

	delete = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params as unknown as ParamsDto;

			const response = await this.service.delete(id);

			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};

	update = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				params: { id },
				body,
			} = req;

			const response = await this.service.update(+id, body);

			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};

	find = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { page, orderBy, sortOrder, limit, ...search } =
				req.query as unknown as SearchDto;

			const response = await this.service.find({
				...search,
				orderBy: orderBy ?? 'name',
				sortOrder: sortOrder ?? 'ASC',
				limit: limit || 10,
				page: page || 0,
			});

			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};
}
