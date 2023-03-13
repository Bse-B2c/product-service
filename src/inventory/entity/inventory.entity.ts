import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Activity } from '@activity/entity/activity.entity';

@Entity()
export class Inventory {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	quantity: number;

	@OneToMany(() => Activity, activity => activity.inventory)
	activities: Array<Activity>;
}
