import {
	IsBoolean,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

export class DiscountDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	@IsNumber()
	discountPercent: number;

	@IsOptional()
	@IsBoolean()
	active: boolean;

	@IsNotEmpty()
	@IsNumber()
	productId: number;
}
