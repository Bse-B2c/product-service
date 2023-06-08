import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Activity } from '@activity/entity/activity.entity';

@Entity()
export class Inventory {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	quantity: number;

	@OneToMany(() => Activity, activity => activity.inventory)
	@JoinColumn()
	activities: Array<Activity>;
}
