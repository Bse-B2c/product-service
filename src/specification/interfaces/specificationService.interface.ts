import { SpecificationDto } from '@specification/dtos/specification.dto';
import { Specification } from '@specification/entity/specification.entity';

export interface SpecificationService {
	create(specification: SpecificationDto): Promise<Specification>;
	findOne(id: number): Promise<Specification>;
}
