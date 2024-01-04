import { Schema, model } from 'mongoose';
import { UserSchema } from './User.model';
import { ScrapingTaskSchema } from './ScrapingTask.model';

export const MailMessagesSchema = new Schema({
  to: { type: String },
  message: { type: String },
  task: { type: ScrapingTaskSchema },
  created_by: { type: UserSchema },
});

export const MailMessages = model<any>('email_messages', MailMessagesSchema);
