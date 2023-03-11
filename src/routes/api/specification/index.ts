import { Router } from 'express';
import { validate } from '@common/utils/validate.utils';
const router = Router();

// controller
import { specificationController } from '@src/specification/';

// dtos
import { SpecificationDto } from '@specification/dtos/specification.dto';

// validate
const validateBody = validate('body');

router.post(
	'/',
	validateBody(SpecificationDto),
	specificationController.create
);

export default router;
