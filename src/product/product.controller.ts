import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '@bse-b2c/common';

export class ProductController {
	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			return res.status(HttpStatusCode.CREATED).send({
				statusCode: HttpStatusCode.CREATED,
				error: null,
				data: {},
			});
		} catch (e) {
			next(e);
		}
	};
}
