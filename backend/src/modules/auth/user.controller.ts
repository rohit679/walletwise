import { Request, Response } from 'express';
import { userService } from './user.service';
import { UpdateProfileSchema } from './user.validators';

export const UserController = {
    async getProfile(req: any, res: Response) {
        const userId = req.user.id;
        const result = await userService.getUserProfile(userId);
        res.status(200).send({
            error: false,
            data: result,
            message: 'User profile fetched successfully',
        });
    },

    async updateProfile(req: any, res: Response) {
        const userId = req.user.id;
        const parse = UpdateProfileSchema.safeParse(req.body);
        if (!parse.success) {
            return res.status(400).json({
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid input',
                    details: parse.error.flatten(),
                },
            });
        }
        const result = await userService.updateUserProfile(userId, parse.data as { name?: string; email?: string });
        res.status(200).send({
            error: false,
            data: result,
            message: 'User profile updated successfully',
        });
    }
};