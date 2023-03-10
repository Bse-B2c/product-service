import { Router } from 'express';
import { validate } from '@common/utils/validate.utils';
const router = Router();

// controller
import { discountController } from '@src/discount';

// dtos
import { DiscountDto } from '@discount/dtos/discount.dto';
import { ParamsDto } from '@common/dtos/params.dto';
import { SearchDto } from '@discount/dtos/search.dto';

// validate
const validateBody = validate('body');
const validateParams = validate('params');
const validateQuery = validate('query');

router.post('/', validateBody(DiscountDto), discountController.create);
router.get('/', validateQuery(SearchDto), discountController.find);
router.get('/:id', validateParams(ParamsDto), discountController.findOne);
router.delete('/:id', validateParams(ParamsDto), discountController.delete);
router.put(
	'/:id',
	validateParams(ParamsDto),
	validateBody(DiscountDto),
	discountController.update
);

export default router;
