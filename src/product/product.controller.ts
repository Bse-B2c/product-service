import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '@bse-b2c/common';
import { ProductService } from '@product/interfaces/productService.interface';
import { ProductDto } from '@product/dtos/product.dto';

export class ProductController {
	constructor(private service: ProductService) {}

	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { name, images, description, releaseDate, categoryId, price } =
				req.body as unknown as ProductDto;

			const response = await this.service.create({
				name,
				images,
				description,
				releaseDate,
				categoryId,
				price,
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

			return res.status(HttpStatusCode.CREATED).send({
				statusCode: HttpStatusCode.CREATED,
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
