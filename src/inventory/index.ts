import { dataSource } from '@src/database';
import { Inventory } from '@inventory/entity/inventory.entity';
import { InventoryService } from '@inventory/inventory.service';
import { activityActivity } from '@src/activity';

const repository = dataSource.getRepository(Inventory);
export const inventoryService = new InventoryService(
	repository,
	activityActivity
);
