import { Router } from 'express';
import { AuthController } from './auth.controller';
import { httpHandler } from '../../utils/http-handler';
import { authMiddleware } from '../../middleware/authMiddleware';

export const authRouter = Router();
authRouter.post('/register', httpHandler(AuthController.register));
authRouter.post('/login', httpHandler(AuthController.login));
authRouter.post('/forgot-password', httpHandler(AuthController.forgotPassword));
authRouter.post('/reset-password', httpHandler(AuthController.resetPassword));
authRouter.post('/logout', authMiddleware, httpHandler(AuthController.logout));
authRouter.post('/refresh-token', httpHandler(AuthController.refreshToken));
