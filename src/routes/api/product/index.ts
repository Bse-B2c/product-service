import { Router } from 'express';
import { validate } from '@common/utils/validate.utils';
const router = Router();

// controller
import { productController } from '@src/product';

// dtos
import { ProductDto } from '@product/dtos/product.dto';
import { ParamsDto } from '@common/dtos/params.dto';
import { SearchDto } from '@product/dtos/search.dto';

// validate
const validateBody = validate('body');
const validateParams = validate('params');
const validateQuery = validate('query');

router.post('/', validateBody(ProductDto), productController.create);
router.get('/:id', validateParams(ParamsDto), productController.findOne);
router.delete('/:id', validateParams(ParamsDto), productController.delete);
router.put(
	'/:id',
	validateParams(ParamsDto),
	validateBody(ProductDto),
	productController.update
);
router.get('/', validateQuery(SearchDto), productController.find);

export default router;
