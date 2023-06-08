import {
	CreateSpecificationDto,
	SpecificationDto,
} from '@specification/dtos/specification.dto';
import { Specification } from '@specification/entity/specification.entity';
import { SearchDto } from '@specification/dtos/search.dto';

export interface SpecificationService {
	create(specification: CreateSpecificationDto): Promise<Specification>;
	findOne(id: number): Promise<Specification>;
	delete(id: number): Promise<Specification>;
	update(id: number, specification: SpecificationDto): Promise<Specification>;
	find(search: SearchDto): Promise<Array<Specification>>;
}
