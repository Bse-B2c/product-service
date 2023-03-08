import { Router } from 'express';

const router = Router();

// controller
import { productController } from '@src/product';

router.post('/', productController.create);

export default router;
