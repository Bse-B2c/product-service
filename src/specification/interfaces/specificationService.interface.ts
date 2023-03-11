import {
	CreateSpecificationDto,
	SpecificationDto,
} from '@specification/dtos/specification.dto';
import { Specification } from '@specification/entity/specification.entity';

export interface SpecificationService {
	create(specification: CreateSpecificationDto): Promise<Specification>;
	findOne(id: number): Promise<Specification>;
	delete(id: number): Promise<Specification>;
	update(id: number, specification: SpecificationDto): Promise<Specification>;
}
