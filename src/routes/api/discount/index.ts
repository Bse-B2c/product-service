import { Router } from 'express';
import { validate } from '@common/utils/validate.utils';
const router = Router();

// controller
import { discountController } from '@src/discount';

// dtos
import { DiscountDto } from '@discount/dtos/discount.dto';

// validate
const validateBody = validate('body');

router.post('/', validateBody(DiscountDto), discountController.create);

export default router;
