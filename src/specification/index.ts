import { dataSource } from '@src/database';
import { Specification } from '@specification/entity/specification.entity';
import { SpecificationService } from '@specification/specification.service';
import { productService } from '@src/product';
import { SpecificationController } from '@specification/specification.controller';

const repository = dataSource.getRepository(Specification);
export const specificationService = new SpecificationService(
	repository,
	productService
);
export const specificationController = new SpecificationController(
	specificationService
);
