import { dataSource } from '@src/database';
import { Discount } from '@discount/entity/discount.entity';
import { DiscountService } from '@discount/discount.service';
import { DiscountController } from '@discount/discount.controller';

const repository = dataSource.getRepository(Discount);
export const discountService = new DiscountService(repository);
export const discountController = new DiscountController(discountService);
