import { ActivityService as Service } from '@activity/interfaces/activityService.interface';
import { Activity } from '@activity/entity/activity.entity';
import { Inventory } from '@inventory/entity/inventory.entity';
import { Repository } from 'typeorm';

export class ActivityService implements Service {
	constructor(private repository: Repository<Activity>) {}

	create = async (activity: {
		quantity: number;
		author: string;
		inventory: Inventory;
		type: number;
	}): Promise<Activity> => {
		const newActivity = this.repository.create({
			quantity: activity.quantity,
			author: activity.author,
			inventory: activity.inventory,
			date: new Date(),
			type: activity.type,
		});

		return this.repository.save(newActivity);
	};
}
