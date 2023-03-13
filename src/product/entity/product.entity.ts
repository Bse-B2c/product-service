import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Discount } from '@src/discount/entity/discount.entity';
import { Specification } from '@specification/entity/specification.entity';
import { Inventory } from '@inventory/entity/inventory.entity';

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

	@OneToOne(() => Inventory, {
		nullable: true,
	})
	@JoinColumn()
	inventory: Inventory | null;

	@OneToMany(() => Specification, specification => specification.product)
	specifications: Array<Specification>;
}
