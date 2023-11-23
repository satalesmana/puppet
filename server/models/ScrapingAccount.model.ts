import { UserSchema } from '~/server/models/User.model'
import { Schema, model } from "mongoose";

export const allowType = ['jobstreet','facebook']

export const ScrapingAccountSchema = new Schema({
  name: { type: String },
  type: { type: String, enum:allowType },
  email: { type: String },
  password: { type: String },
  created_by: { type: UserSchema },
});

export const ScrapingAccount = model<any>("scraping_account", ScrapingAccountSchema);
