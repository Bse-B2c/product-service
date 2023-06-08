import { Discount } from '@discount/entity/discount.entity';
import { DiscountDto } from '@discount/dtos/discount.dto';
import { SearchDto } from '@discount/dtos/search.dto';

export interface DiscountService {
	create(discount: DiscountDto): Promise<Discount>;
	findOne(id: number): Promise<Discount>;
	delete(id: number): Promise<Discount>;
	update(id: number, discount: DiscountDto): Promise<Discount>;
	find(search: SearchDto): Promise<Array<Discount>>;
}
