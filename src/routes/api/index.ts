import { Router } from 'express';
import product from '@src/routes/api/product';

const router = Router();

router.use('/', product);

export default router;
