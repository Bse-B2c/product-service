import { ActivityService } from '@activity/activity.service';
import { dataSource } from '@src/database';
import { Activity } from '@activity/entity/activity.entity';

const repository = dataSource.getRepository(Activity);
export const activityActivity = new ActivityService(repository);
