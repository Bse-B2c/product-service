import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SpecificationDto {
	@IsString()
	@IsNotEmpty()
	label: string;

	@IsString()
	@IsNotEmpty()
	value: string;
}

export class CreateSpecificationDto extends SpecificationDto {
	@IsNumber()
	@IsNotEmpty()
	productId: number;
}
