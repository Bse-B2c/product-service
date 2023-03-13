import { Inventory } from '@inventory/entity/inventory.entity';

export interface InventoryService {
	create(quantity: number): Promise<Inventory>;
	update(
		id: number,
		inventory: { quantity: number; author: string }
	): Promise<Inventory>;
	findOne(id: number): Promise<Inventory>;
}
