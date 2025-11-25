import { set } from "mongoose";
import { AuthRepository } from "./auth.repository";
import createError from "http-errors";

export const userService = {
    async getUserProfile(userId: string) {
        const user = await AuthRepository.findById(userId);
        if (!user) {
            throw createError(404, 'User not found');
        }
        return { id: user._id, name: user.name, email: user.email };
    },

    async updateUserProfile(userId: string, input: { name?: string; email?: string }) {
        const user = await AuthRepository.findById(userId);
        if (!user) {
            throw createError(404, 'User not found');
        }

        if (input.email && input.email !== user.email) {
            const existingUser = await AuthRepository.findByEmail(input.email);
            if (existingUser) {
                throw createError(400, 'Email is already in use');
            }
        }

        const updatedUser = await AuthRepository.updateUser(userId, {
            name: input.name ?? user.name,
            email: input.email ?? user.email,
        });
        return { id: updatedUser._id, name: updatedUser.name, email: updatedUser.email };
    }
};
