import { BaseSearchFilter } from '@common/dtos/baseSearchFilter.dto';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { formatQueryToArray } from '@common/utils/query.utils';

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
	name: string;

	@IsOptional()
	@IsString()
	description: string;

	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => +value)
	startPrice: number;

	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => +value)
	endPrice: number;

	@IsOptional()
	@IsNumber({}, { each: true })
	@Transform(({ value }) => {
		if (value) return formatQueryToArray(value).map((e: string) => +e);

		return value;
	})
	categories: Array<number>;

	@IsString()
	@IsIn(['id', 'name', 'description', 'price', 'createdAt', 'releaseDate'])
	@IsOptional()
	orderBy?: string;
}
