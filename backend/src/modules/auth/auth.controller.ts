import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterSchema, LoginSchema, ForgotPasswordSchema } from './auth.validators';

export const AuthController = {
  async register(req: Request, res: Response) {
    const parse = RegisterSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input',
          details: parse.error.flatten(),
        },
      });
    }
    const result = await AuthService.register(
      parse.data as { name: string; email: string; password: string }
    );
    res.status(200).send({
      error: false,
      data: result,
      message: 'User Registered successfully',
    });
  },

  async login(req: Request, res: Response) {
    const parse = LoginSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input',
          details: parse.error.flatten(),
        },
      });
    }
    const result = await AuthService.login(parse.data as { email: string; password: string });
    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie('accessToken', result.accessToken, options)
      .cookie('refreshToken', result.refreshToken, options)
      .send({
        error: false,
        data: result,
        message: 'User Logged in successfully',
      });
  },

  async forgotPassword(req: Request, res: Response) {
    const parse = ForgotPasswordSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input',
          details: parse.error.flatten(),
        },
      });
    }
    const { email } = req.body;
    await AuthService.forgotPassword(email);
    res.status(200).send({
      error: false,
      message: 'Reset password link has been sent to your email address',
    });
  },

  async resetPassword(req: Request, res: Response) {
    const { email, token, newPassword } = req.body;

    if (typeof email !== 'string' || typeof token !== 'string') {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Email and token are required',
        },
      });
    }

    await AuthService.resetPassword({ email, token, newPassword });
    res.status(200).send({
      error: false,
      message: 'Password reset successful, you can now log in with your new password',
    });
  },

  async logout(req: Request, res: Response) {
    await AuthService.logout((req as any).user);
    res
      .status(200)
      .clearCookie('accessToken')
      .clearCookie('refreshToken')
      .send({
        error: false,
        message: 'User logged out successfully',
      });
  },

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies?.refreshToken || req.header('x-refresh-token');
    if (!refreshToken || typeof refreshToken !== 'string') {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Refresh token is required',
        },
      });
    }

    const result = await AuthService.refreshToken(refreshToken);
    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie('accessToken', result.accessToken, options)
      .cookie('refreshToken', result.refreshToken, options)
      .send({
        error: false,
        data: result,
        message: 'Token refreshed successfully',
      });
  },
};
