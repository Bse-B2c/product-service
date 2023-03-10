import { Router } from 'express';
import product from '@src/routes/api/product';
import discount from '@src/routes/api/discount';

const router = Router();

router.use('/', product);
router.use('/discount', discount);

export default router;
