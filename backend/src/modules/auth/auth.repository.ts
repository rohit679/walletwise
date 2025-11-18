import { UserModel, type UserDoc } from './user.model';

export const AuthRepository = {
  async findById(id: string) {
    const user = await UserModel.findById(id).lean();
    return user;
  },
  async findByEmail(email: string) {
    const user = await UserModel.findOne({ email }).lean();
    return user;
  },
  async createUser(user: { email: string; name: string; passwordHash: string; settings?: any }) {
    const doc = await UserModel.create(user);
    return doc.toObject();
  },
  async updateUser(id: string, update: Partial<UserDoc>) {
    const user = await UserModel.findByIdAndUpdate(id, update, { new: true }).lean();  
    return user;
  }
};
