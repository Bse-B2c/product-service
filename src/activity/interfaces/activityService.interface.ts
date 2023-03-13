import { Activity } from '@activity/entity/activity.entity';
import { Inventory } from '@inventory/entity/inventory.entity';

export interface ActivityService {
	create(activity: {
		quantity: number;
		author: string;
		inventory: Inventory;
		type: number;
	}): Promise<Activity>;
}
