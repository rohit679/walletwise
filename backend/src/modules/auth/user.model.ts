import mongoose, { Schema, InferSchemaType } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    settings: {
      currency: { type: String, default: 'INR' },
      theme: { type: String, default: 'system' },
    },
    refreshToken: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Number },
  },
  { strict: false, timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export type UserDoc = InferSchemaType<typeof userSchema>;
export const UserModel = mongoose.model('users', userSchema);
