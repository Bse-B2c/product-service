import { Transform } from 'class-transformer';
import { formatQueryToArray } from '@common/utils/query.utils';
import { BaseSearchFilter } from '@common/dtos/baseSearchFilter.dto';
import {
	IsBoolean,
	IsIn,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

export class SearchDto extends BaseSearchFilter {
	@IsOptional()
	@IsNumber({}, { each: true })
	@Transform(({ value }) => {
		if (value) return formatQueryToArray(value).map((e: string) => +e);

		return value;
	})
	ids?: Array<number>;

	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@Transform(({ value }) => value === 'true')
	@IsBoolean()
	active?: boolean;

	@IsOptional()
	@Transform(({ value }) => +value)
	@IsNumber()
	discountPercent?: number;

	@IsString()
	@IsIn(['id', 'name', 'active', 'discountPercent'])
	@IsOptional()
	orderBy?: string;
}
