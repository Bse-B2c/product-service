import { SpecificationService } from '@specification/interfaces/specificationService.interface';
import { NextFunction, Request, Response } from 'express';
import { SpecificationDto } from '@specification/dtos/specification.dto';
import { HttpStatusCode } from '@bse-b2c/common';

export class SpecificationController {
	constructor(private service: SpecificationService) {}

	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { productId, value, label } =
				req.body as unknown as SpecificationDto;

			const response = await this.service.create({ productId, value, label });

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
