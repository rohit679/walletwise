import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterSchema, LoginSchema } from './auth.validators';

export const AuthController = {
  async register(req: Request, res: Response) {
    const parse = RegisterSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: parse.error.flatten() } });
    }
    const result = await AuthService.register(parse.data as { name: string; email: string; passwordHash: string });
    res
      .status(200)
      .send({
        error: false,
        data: result,
        message: "User Registered successfully"
      });
  },

  async login(req: Request, res: Response) {
    const parse = LoginSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: parse.error.flatten() } });
    }
    const result = await AuthService.login(parse.data as { email: string; passwordHash: string });
    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("accessToken", result.accessToken, options)
      .cookie("refreshToken", result.refreshToken, options)
      .send({
        error: false,
        data: result,
        message: "User Logged in successfully"
      });
  }
};
