import { Router } from 'express';
import { validate } from '@common/utils/validate.utils';
const router = Router();

// controller
import { discountController } from '@src/discount';

// dtos
import { DiscountDto } from '@discount/dtos/discount.dto';
import { ParamsDto } from '@common/dtos/params.dto';

// validate
const validateBody = validate('body');
const validateParams = validate('params');

router.post('/', validateBody(DiscountDto), discountController.create);
router.get('/:id', validateParams(ParamsDto), discountController.findOne);
router.delete('/:id', validateParams(ParamsDto), discountController.delete);
router.put(
	'/:id',
	validateParams(ParamsDto),
	validateBody(DiscountDto),
	discountController.update
);

export default router;
