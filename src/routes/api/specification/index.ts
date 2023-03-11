import { Router } from 'express';
import { validate } from '@common/utils/validate.utils';
const router = Router();

// controller
import { specificationController } from '@src/specification/';

// dtos
import { SpecificationDto } from '@specification/dtos/specification.dto';
import { ParamsDto } from '@common/dtos/params.dto';

// validate
const validateBody = validate('body');
const validateParams = validate('params');

router.post(
	'/',
	validateBody(SpecificationDto),
	specificationController.create
);
router.get('/:id', validateParams(ParamsDto), specificationController.findOne);
router.delete(
	'/:id',
	validateParams(ParamsDto),
	specificationController.delete
);

export default router;
