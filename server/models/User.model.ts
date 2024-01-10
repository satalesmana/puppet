import { Schema, model } from 'mongoose';

export const UserRole = ['user', 'admin'];

export const UserSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String, enum: UserRole, default: 'user' },
});

export const User = model<any>('User', UserSchema);
