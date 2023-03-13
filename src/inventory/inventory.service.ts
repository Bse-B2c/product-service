import { InventoryService as Service } from '@inventory/interfaces/inventoryService.interface';
import { Repository } from 'typeorm';
import { Inventory } from '@inventory/entity/inventory.entity';
import { ActivityService } from '@activity/interfaces/activityService.interface';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';
import { ActivityType } from '@common/enum/activityType.enum';

export class InventoryService implements Service {
	constructor(
		private repository: Repository<Inventory>,
		private activityService: ActivityService
	) {}

	create = async (quantity: number): Promise<Inventory> => {
		const newInventory = this.repository.create({
			quantity,
			activities: [],
		});

		return this.repository.save(newInventory);
	};

	findOne = async (id: number): Promise<Inventory> => {
		const inventory = await this.repository.findOne({
			relations: { activities: true },
			where: { id },
		});

		if (!inventory)
			throw new HttpException({
				statusCode: HttpStatusCode.NOT_FOUND,
				message: `Inventory ${id} not found`,
			});

		return inventory;
	};

	update = async (
		id: number,
		updateInventory: {
			quantity: number;
			author: string;
		}
	): Promise<Inventory> => {
		const inventory = await this.findOne(id);
		let type = ActivityType.QUANTITY_ADDED;

		if (inventory.quantity > updateInventory.quantity) {
			type = ActivityType.QUANTITY_REMOVED;
		}

		if (inventory.quantity < updateInventory.quantity) {
			type = ActivityType.QUANTITY_ADDED;
		}

		Object.assign(inventory, { quantity: updateInventory.quantity });

		const updatedInventory = await this.repository.save(inventory);

		await this.activityService.create({
			author: updateInventory.author,
			type: type,
			inventory: updatedInventory,
			quantity: inventory.quantity,
		});

		return updatedInventory;
	};
}
