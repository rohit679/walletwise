import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthRepository } from './auth.repository';
import createError from 'http-errors';
import { getSecret } from '../../configuration';
import { sendEmail } from '../../utils/send-mail';
import crypto from 'crypto';

export const AuthService = {
  async register(input: { name: string; email: string; password: string }) {
    const { baseUrl } = getSecret();
    const existing = await AuthRepository.findByEmail(input.email);
    if (existing) {
      throw createError(409, 'Email already in use');
    }
    const user = await AuthRepository.createUser(input);
    await sendEmail({
      to: user.email,
      subject: 'Welcome to WalletWise!',
      template: 'welcome',
      variables: {
        name: user.name,
        loginUrl: `${baseUrl}/login`,
        year: new Date().getFullYear().toString(),
      },
    });
    return { user: { name: user.name, email: user.email } };
  },

  async login(input: { email: string; password: string }) {
    const user = await AuthRepository.findByEmail(input.email);
    if (!user) {
      throw createError(400, 'User Email does not exist');
    }
    const ok = await bcrypt.compare(input.password, user.password);
    if (!ok) {
      throw createError(401, 'Invalid credentials');
    }

    const { accessToken, refreshToken } = await this.generateAccessAndRefereshTokens(user);
    return {
      accessToken,
      refreshToken,
      user: { id: user._id, name: user.name, email: user.email },
    };
  },

  async forgotPassword(email: string) {
    const { baseUrl } = getSecret();
    const user = await AuthRepository.findByEmail(email);
    if (!user) {
      throw createError(400, 'User Email does not exist');
    }

    const resetPasswordToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordExpires = Date.now() + 900000; // 15 min from now

    await AuthRepository.updateUser(user._id, {
      resetPasswordToken,
      resetPasswordExpires,
    });
    const resetUrl = `${baseUrl}/reset-password?email=${email}&token=${resetPasswordToken}`;

    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      template: 'forgetPassword',
      variables: {
        name: user.name,
        resetUrl,
        year: new Date().getFullYear().toString(),
      },
    });
  },

  async resetPassword(input: { email: string; token: string; newPassword: string }) {
    const { baseUrl } = getSecret();
    const user = await AuthRepository.findByEmail(input.email);
    if (
      !user ||
      user.resetPasswordToken !== input.token ||
      !user.resetPasswordExpires ||
      user.resetPasswordExpires < Date.now()
    ) {
      throw createError(400, 'Invalid or expired password reset token');
    }

    const password = await bcrypt.hash(input.newPassword, 10);
    await AuthRepository.updateUser(user._id, {
      password,
      resetPasswordToken: undefined,
      resetPasswordExpires: undefined,
    });

    await sendEmail({
      to: user.email,
      subject: 'Your Password Has Been Reset',
      template: 'resetPassword',
      variables: {
        name: user.name,
        year: new Date().getFullYear().toString(),
        loginUrl: `${baseUrl}/login`,
      },
    });
  },

  async logout(user: any) {
    const { id, token  } = user as any;
    const decodedToken: any = jwt.decode(token);
    const expiresAt = decodedToken.exp * 1000;
    await AuthRepository.blacklistToken(token, expiresAt);
    await AuthRepository.updateUser(id, { refreshToken: null });
  },

  async refreshToken(oldRefreshToken: string) {
    const { refreshTokenSecret } = getSecret();
    let decodedToken: any;
    try {
      decodedToken = jwt.verify(oldRefreshToken, refreshTokenSecret);
    } catch (err) {
      throw createError(401, 'Invalid refresh token');
    }

    const user = await AuthRepository.findById(decodedToken.id);
    if (!user || user.refreshToken !== oldRefreshToken) {
      throw createError(401, 'Invalid refresh token');
    }

    const { accessToken, refreshToken } = await this.generateAccessAndRefereshTokens(user);
    return {
      accessToken,
      refreshToken,
    };
  },

  async generateAccessAndRefereshTokens(user) {
    try {
      const { accessTokenSecret, accessTokenExpiresIn, refreshTokenExpiresIn, refreshTokenSecret } =
        getSecret();
      if (!accessTokenSecret) {
        throw new Error('Access token secret is not defined');
      }

      const accessToken = (jwt as any).sign(
        {
          id: user._id,
          email: user.email,
          name: user.name,
        },
        accessTokenSecret,
        {
          expiresIn: accessTokenExpiresIn,
        }
      );
      const refreshToken = (jwt as any).sign(
        {
          id: user._id,
        },
        refreshTokenSecret,
        {
          expiresIn: refreshTokenExpiresIn,
        }
      );
      await AuthRepository.updateUser(user._id, { refreshToken: refreshToken });
      return { accessToken, refreshToken };
    } catch (err) {
      throw createError(500, 'Error while generating referesh and access token');
    }
  },
};
