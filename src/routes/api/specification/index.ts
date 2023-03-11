import { Router } from 'express';
import { validate } from '@common/utils/validate.utils';
const router = Router();

// controller
import { specificationController } from '@src/specification/';

// dtos
import {
	CreateSpecificationDto,
	SpecificationDto,
} from '@specification/dtos/specification.dto';
import { ParamsDto } from '@common/dtos/params.dto';

// validate
const validateBody = validate('body');
const validateParams = validate('params');

router.post(
	'/',
	validateBody(CreateSpecificationDto),
	specificationController.create
);
router.put(
	'/:id',
	validateParams(ParamsDto),
	validateBody(SpecificationDto),
	specificationController.update
);
router.get('/:id', validateParams(ParamsDto), specificationController.findOne);
router.delete(
	'/:id',
	validateParams(ParamsDto),
	specificationController.delete
);

export default router;
