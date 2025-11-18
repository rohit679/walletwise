import { Router } from 'express';
import { AuthController } from './auth.controller';

export const authRouter = Router();
authRouter.post('/register', (req, res, next) => AuthController.register(req, res).catch(next));
authRouter.post('/login', (req, res, next) => AuthController.login(req, res).catch(next));
