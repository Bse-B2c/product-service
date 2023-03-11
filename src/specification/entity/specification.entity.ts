import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '@product/entity/product.entity';

@Entity()
export class Specification {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	label: string;

	@Column()
	value: string;

	@ManyToOne(() => Product, product => product.specifications)
	product: Product;
}
