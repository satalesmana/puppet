import { Schema, model } from 'mongoose';
import { ScrapingTaskSchema } from './ScrapingTask.model';

export const ScrapingPelamarKupuSchema = new Schema({
  realName: { type: String, default: null },
  gender: { type: String, default: null },
  status: { type: String, default: null },
  phone: { type: String, default: null },
  age: { type: String, default: null },
  email: { type: String, default: null },
  photo: { type: String, default: null },
  height: { type: String, default: null },
  weight: { type: String, default: null },
  birthday: { type: String, default: null },
  birthdayUS: { type: String, default: null },
  religion: { type: String, default: null },
  religionName: { type: String, default: null },
  userVerified: { type: String, default: null },
  healthVerified: { type: String, default: null },
  userRoleStatus: { type: String, default: null },
  workingYears: { type: String, default: null },
  workingYearsStr: { type: String, default: null },
  workingYearsFormat: { type: String, default: null },
  resumeId: { type: String, default: null },
  levelCode: { type: String, default: null },
  levelName: { type: String, default: null },
  phoneVerified: { type: String, default: null },
  emailVerified: { type: String, default: null },
  openFlag: { type: String, default: null },
  provinceId: { type: String, default: null },
  cityId: { type: String, default: null },
  areaId: { type: String, default: null },
  postalCode: { type: String, default: null },
  videosUrl: { type: String, default: null },
  bindMgmCode: { type: String, default: null },
  bindReferralCode: { type: String, default: null },
  bindReferralType: { type: String, default: null },
  currentAddress: { type: String, default: null },
  ageFmt: { type: String, default: null },
  scraping_task: { type: ScrapingTaskSchema },
  sync_status: { type: String, default: null },
});

export const ScrapingPelamarKupu = model<any>(
  'scraping_pelamar_kupu',
  ScrapingPelamarKupuSchema,
);
