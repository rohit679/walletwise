import mongoose, { Schema, InferSchemaType } from 'mongoose';

const blackListTokenSchema = new Schema(
  {
    token: { type: String, required: true, unique: true },
    blacklistedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
  },
  { strict: false, timestamps: true }
);

blackListTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export type BlackListTokenDoc = InferSchemaType<typeof blackListTokenSchema>;
export const BlackListTokenModel = mongoose.model('blacklist_token', blackListTokenSchema);
