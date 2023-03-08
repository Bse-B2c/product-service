import { Router } from 'express';
import { validate } from '@common/utils/validate.utils';
const router = Router();

// controller
import { productController } from '@src/product';

// dtos
import { ProductDto } from '@product/dtos/product.dto';

// validate
const validateBody = validate('body');

router.post('/', validateBody(ProductDto), productController.create);

export default router;
