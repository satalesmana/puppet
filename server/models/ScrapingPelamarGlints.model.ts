import { Schema, model } from 'mongoose';
import { ScrapingTaskSchema } from './ScrapingTask.model';

export const ScrapingGlintsPelamarSchema = new Schema({
  id: { type: String, default: null },
  firstName:{ type: String, default: null },
  lastName:{ type: String, default: null },
  gender: { type: String, default: null },
  location: { type: String, default: null },
  phoneNumber:{ type: String, default: null },
  email:{ type: String, default: null },
  scraping_task: { type: ScrapingTaskSchema },
  updateBucket: { type: String },
  sync_status: { type: String, default: null },
});

export const ScrapingGlintsPelamar = model<any>(
  'scraping_glints_pelamar',
  ScrapingGlintsPelamarSchema,
);
