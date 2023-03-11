import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Discount } from '@src/discount/entity/discount.entity';
import { Specification } from '@specification/entity/specification.entity';

//TODO: Add inventory property

@Entity()
export class Product {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	price: number;

	@Column({ default: new Date() })
	createdAt: Date;

	@Column()
	releaseDate: Date;

	@Column()
	categoryId: number;

	@Column({ default: [], array: true, type: 'varchar' })
	images: Array<string>;

	@ManyToOne(() => Discount, discount => discount.product, { nullable: true })
	discount: Discount | null;

	@OneToMany(() => Specification, specification => specification.product)
	specifications: Array<Specification>;
}
