import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '@product/entity/product.entity';

@Entity()
export class Discount {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	discountPercent: number;

	@Column({ default: false })
	active: boolean;

	@OneToMany(() => Product, product => product.discount)
	product: Array<Product>;
}
