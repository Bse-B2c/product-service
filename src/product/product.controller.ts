import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '@bse-b2c/common';
import { ProductService } from '@product/interfaces/productService.interface';
import { ProductDto } from '@product/dtos/product.dto';
import { ParamsDto } from '@common/dtos/params.dto';
import { SearchDto } from '@product/dtos/search.dto';

export class ProductController {
	constructor(private service: ProductService) {}

	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				name,
				images,
				description,
				releaseDate,
				categoryId,
				discountId,
				price,
				quantity,
			} = req.body as unknown as ProductDto;

			const response = await this.service.create({
				name,
				images,
				description,
				releaseDate,
				categoryId,
				price,
				discountId,
				quantity,
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
			const { id } = req.params;

			const response = await this.service.findOne(+id);

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
			const { id } = req.params;

			const response = await this.service.delete(+id);

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
			const { id } = req.params as unknown as ParamsDto;
			const {
				name,
				images,
				description,
				releaseDate,
				categoryId,
				discountId,
				price,
				quantity,
			} = req.body as unknown as ProductDto;

			const response = await this.service.update(id, {
				name,
				images,
				description,
				releaseDate,
				categoryId,
				price,
				discountId,
				quantity,
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
