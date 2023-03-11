import { Router } from 'express';
import product from '@src/routes/api/product';
import discount from '@src/routes/api/discount';
import specification from '@src/routes/api/specification';

const router = Router();

router.use('/specification', specification);
router.use('/discount', discount);
router.use('/', product);

export default router;
