import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Product } from '@product/entity/product.entity';
import { Discount } from '@src/discount/entity/discount.entity';
import { Specification } from '@specification/entity/specification.entity';
import { Inventory } from '@inventory/entity/inventory.entity';
import { Activity } from '@activity/entity/activity.entity';

dotenv.config();

export const dataSource = new DataSource({
	type: 'postgres',
	host: process.env['TYPEORM_HOST'] ?? 'localhost',
	port: Number(process.env['TYPEORM_PORT']) || 5432,
	username: process.env['TYPEORM_USERNAME'],
	password: process.env['TYPEORM_PASSWORD'],
	database: process.env['TYPEORM_DATABASE'],
	entities: [Product, Discount, Specification, Inventory, Activity],
	synchronize: true,
});

class PostgresDB {
	constructor(private dataSource: DataSource) {}

	async connect(): Promise<void> {
		try {
			await this.dataSource.initialize();
		} catch (e) {
			console.error('Error during Data Source initialization', e);
		}
	}
}

export default new PostgresDB(dataSource);
