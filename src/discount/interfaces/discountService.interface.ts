import { Discount } from '@discount/entity/discount.entity';
import { DiscountDto } from '@discount/dtos/discount.dto';

export interface DiscountService {
	create(discount: DiscountDto): Promise<Discount>;
}
