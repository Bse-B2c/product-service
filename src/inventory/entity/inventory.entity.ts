import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '@product/entity/product.entity';

export class Inventory {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	quantity: number;

	@OneToMany(() => Product, product => product.inventory)
	product: Array<Product>;
}
