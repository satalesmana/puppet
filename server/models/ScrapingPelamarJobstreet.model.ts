import { Schema, model } from 'mongoose';
import { ScrapingTaskSchema } from './ScrapingTask.model';

export const ScrapingJobstreetPelamarSchema = new Schema({
  id: { type: String, default: null },
  billableStatus: { type: String },
  candidateId: { type: String },
  jobApplicationId: { type: String },
  seekCandidateId: { type: String },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  email: { type: String, default: null },
  phone: { type: String, default: null },
  mostRecentJobTitle: { type: String },
  mostRecentCompanyName: { type: String },
  mostRecentRoleMonths: { type: String },
  appliedDate: { type: String },
  profile: { type: Object },
  scraping_task: { type: ScrapingTaskSchema },
  updateBucket: { type: String },
});

export const ScrapingJobstreetPelamar = model<any>(
  'scraping_jobstreet_pelamar',
  ScrapingJobstreetPelamarSchema,
);
