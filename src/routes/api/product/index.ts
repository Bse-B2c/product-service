import { Router } from 'express';
import { validate } from '@common/utils/validate.utils';
const router = Router();

// controller
import { productController } from '@src/product';

// dtos
import { ProductDto } from '@product/dtos/product.dto';
import { ParamsDto } from '@common/dtos/params.dto';

// validate
const validateBody = validate('body');
const validateParams = validate('params');

router.post('/', validateBody(ProductDto), productController.create);
router.get('/:id', validateParams(ParamsDto), productController.findOne);
router.delete('/:id', validateParams(ParamsDto), productController.delete);

export default router;
