import { Schema, model } from 'mongoose';
import { UserSchema } from './User.model';
import { ScrapingTaskSchema } from './ScrapingTask.model';

export const MailStatus = ['pending', 'done'];

export const MailMessagesSchema = new Schema({
  to: { type: String },
  message: { type: String },
  subject: { type: String },
  task: { type: ScrapingTaskSchema },
  status: { type: String, enum: MailStatus, default: 'pending' },
  created_by: { type: UserSchema },
  creted_at: { type: Date, default: new Date() },
});

export const MailMessages = model<any>('email_messages', MailMessagesSchema);
