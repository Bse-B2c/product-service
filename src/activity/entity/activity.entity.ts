import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Inventory } from '@inventory/entity/inventory.entity';

@Entity()
export class Activity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	author: string;

	@Column()
	type: number;

	@Column()
	date: Date;

	@Column()
	quantity: number;

	@ManyToOne(() => Inventory, inventory => inventory)
	inventory: Inventory;
}
