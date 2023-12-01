import { Schema, model } from 'mongoose';
import { UserSchema } from '~/server/models/User.model';
import { ScrapingAccountSchema } from '~/server/models/ScrapingAccount.model';

export const ScrapingStatus = ['open', 'in progress', 'done', 'failed'];

export const ScrapingTaskSchema = new Schema({
  scraping_account: { type: ScrapingAccountSchema },
  initial_id: { type: String },
  biller_id: { type: Number },
  initial_page: { type: Number },
  counter: { type: Number },
  status: { type: String, enum: ScrapingStatus, default: 'open' },
  created_by: { type: UserSchema },
});

export const ScrapingTask = model<any>('scraping_task', ScrapingTaskSchema);
