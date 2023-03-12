import {
	IsISO8601,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

export class ProductDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	description: string;

	@IsNotEmpty()
	@IsNumber()
	price: number;

	@IsNotEmpty()
	@IsISO8601()
	releaseDate: string;

	@IsNotEmpty()
	@IsNumber()
	categoryId: number;

	@IsOptional()
	@IsString({ each: true })
	images: Array<string>;

	@IsOptional()
	@IsNumber()
	discountId: number;
}
