import { SpecificationService as Service } from '@specification/interfaces/specificationService.interface';
import { Specification } from '@specification/entity/specification.entity';
import {
	CreateSpecificationDto,
	SpecificationDto,
} from '@specification/dtos/specification.dto';
import { Repository } from 'typeorm';
import { ProductService } from '@product/interfaces/productService.interface';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';

export class SpecificationService implements Service {
	constructor(
		private repository: Repository<Specification>,
		private productService: ProductService
	) {}

	create = async ({
		productId,
		...specification
	}: CreateSpecificationDto): Promise<Specification> => {
		const product = await this.productService.findOne(productId);

		const newSpecification = this.repository.create({
			...specification,
			product,
		});

		return this.repository.save(newSpecification);
	};

	findOne = async (id: number): Promise<Specification> => {
		const specification = await this.repository.findOne({ where: { id } });

		if (!specification)
			throw new HttpException({
				statusCode: HttpStatusCode.NOT_FOUND,
				message: `Specification ${id} not found`,
			});

		return specification;
	};

	delete = async (id: number): Promise<Specification> => {
		const specification = await this.findOne(id);

		await this.repository.delete(id);

		return specification;
	};

	update = async (
		id: number,
		{ value, label }: SpecificationDto
	): Promise<Specification> => {
		const specification = await this.findOne(id);

		Object.assign(specification, { value, label });

		return this.repository.save(specification);
	};
}
