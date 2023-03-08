import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//TODO: Add inventory property
//TODO: Add discount property
//TODO: Add specifications property

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
}
