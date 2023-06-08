import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { formatQueryToArray } from '@common/utils/query.utils';
import { BaseSearchFilter } from '@common/dtos/baseSearchFilter.dto';

export class SearchDto extends BaseSearchFilter {
	@IsOptional()
	@IsNumber({}, { each: true })
	@Transform(({ value }) => {
		if (value) return formatQueryToArray(value).map((e: string) => +e);

		return value;
	})
	ids: Array<number>;

	@IsOptional()
	@IsString()
	label: string;

	@IsOptional()
	@IsString()
	value: string;

	@IsString()
	@IsIn(['id', 'label', 'value'])
	@IsOptional()
	orderBy?: string;
}
