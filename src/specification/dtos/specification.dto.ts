import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SpecificationDto {
	@IsString()
	@IsNotEmpty()
	label: string;

	@IsString()
	@IsNotEmpty()
	value: string;

	@IsNumber()
	@IsNotEmpty()
	productId: number;
}
