import { Schema, model } from 'mongoose';
import { UserSchema } from './User.model';

export const allowType = ['jobstreet', 'facebook', 'kupu'];

export const ScrapingAccountSchema = new Schema({
  name: { type: String },
  type: { type: String, enum: allowType },
  email: { type: String },
  phone: { type: String, default: null },
  password: { type: String },
  cookies: { type: String, default: null },
  created_by: { type: UserSchema },
});

export const ScrapingAccount = model<any>(
  'scraping_account',
  ScrapingAccountSchema,
);
