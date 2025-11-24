import { Router } from 'express';
import { AuthController } from './auth.controller';

export const authRouter = Router();
authRouter.post('/register', (req, res, next) => AuthController.register(req, res).catch(next));
authRouter.post('/login', (req, res, next) => AuthController.login(req, res).catch(next));
authRouter.post('/forgot-password', (req, res, next) =>
  AuthController.forgotPassword(req, res).catch(next)
);
authRouter.post('/reset-password', (req, res, next) =>
  AuthController.resetPassword(req, res).catch(next)
);
