import { Schema, model } from 'mongoose';

export const UserSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});

export const User = model<any>('User', UserSchema);
