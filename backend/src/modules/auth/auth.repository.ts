import { UserModel, type UserDoc } from './user.model';
import { BlackListTokenModel } from './blacklistToken.model';

export const AuthRepository = {
  async findById(id: string) {
    const user = await UserModel.findById(id).lean();
    return user;
  },
  async findByEmail(email: string) {
    const user = await UserModel.findOne({ email }).lean();
    return user;
  },
  async createUser(user: { email: string; name: string; password: string; settings?: any }) {
    const doc = await UserModel.create(user);
    return doc.toObject();
  },
  async updateUser(id: any, update: Partial<UserDoc>) {
    const setFields: Record<string, any> = {};
    const unsetFields: Record<string, ''> = {};

    if (update && typeof update === 'object') {
      for (const [key, value] of Object.entries(update as Record<string, any>)) {
        if (value === undefined) {
          unsetFields[key] = '';
        } else {
          setFields[key] = value;
        }
      }
    }

    const updateQuery: Record<string, any> = {};
    if (Object.keys(setFields).length) updateQuery.$set = setFields;
    if (Object.keys(unsetFields).length) updateQuery.$unset = unsetFields;

    // If updateQuery is empty nothing to do
    if (!Object.keys(updateQuery).length) {
      return await UserModel.findById(id).lean();
    }

    const user = await UserModel.findByIdAndUpdate(id, updateQuery, { new: true }).lean();
    return user;
  },
  async blacklistToken(token: string, expiresAt: number) {
    await BlackListTokenModel.create({ token, expiresAt: new Date(expiresAt) });
  },
};
