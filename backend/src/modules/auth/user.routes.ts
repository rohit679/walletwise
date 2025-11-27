import { Router } from 'express';
import { UserController } from './user.controller';
import { httpHandler } from '../../utils/http-handler';
import { authMiddleware } from '../../middleware/authMiddleware';

export const userRouter = Router();
userRouter.post('/profile', authMiddleware, httpHandler(UserController.getProfile));
userRouter.put('/profile', authMiddleware, httpHandler(UserController.updateProfile));
