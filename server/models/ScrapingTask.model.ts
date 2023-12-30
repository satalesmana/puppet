import { Schema, model } from 'mongoose';
import { UserSchema } from './User.model';
import { ScrapingAccountSchema } from './ScrapingAccount.model';

export const ScrapingStatus = ['open', 'in progress', 'done', 'failed'];

export const ScrapingTaskSchema = new Schema({
  code: { type: String },
  initial_id: { type: String },
  positionId: { type: String },
  biller_id: { type: Number },
  initial_page: { type: Number },
  counter: { type: Number },
  status: { type: String, enum: ScrapingStatus, default: 'open' },
  created_by: { type: UserSchema },
  scraping_account: { type: ScrapingAccountSchema },
});

export const ScrapingTask = model<any>('scraping_task', ScrapingTaskSchema);
