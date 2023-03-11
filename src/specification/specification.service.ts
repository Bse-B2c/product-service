import { SpecificationService as Service } from '@specification/interfaces/specificationService.interface';
import { Specification } from '@specification/entity/specification.entity';
import { SpecificationDto } from '@specification/dtos/specification.dto';
import { Repository } from 'typeorm';
import { ProductService } from '@product/interfaces/productService.interface';

export class SpecificationService implements Service {
	constructor(
		private repository: Repository<Specification>,
		private productService: ProductService
	) {}

	create = async ({
		productId,
		...specification
	}: SpecificationDto): Promise<Specification> => {
		const product = await this.productService.findOne(productId);

		const newSpecification = this.repository.create({
			...specification,
			product,
		});

		return this.repository.save(newSpecification);
	};
}
