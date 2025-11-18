import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthRepository } from './auth.repository';
import createError from 'http-errors';
import { getSecret } from '../../configuration';

export const AuthService = {
  async register(input: { name: string; email: string; passwordHash: string }) {
    const existing = await AuthRepository.findByEmail(input.email);
    if (existing) {
      throw createError(409, 'Email already in use');
    }
    const user = await AuthRepository.createUser(input);
    return { user: { name: user.name, email: user.email } };
  },

  async login(input: { email: string; passwordHash: string }) {
    const user = await AuthRepository.findByEmail(input.email);
    if (!user) {
      throw createError(400, 'User Email does not exist');
    }
    const ok = await bcrypt.compare(input.passwordHash, user.passwordHash);
    if (!ok) {
      throw createError(401, 'Invalid credentials');
    }

    const { accessToken, refreshToken } = await this.generateAccessAndRefereshTokens(user);
    return { accessToken, refreshToken, user: { id: user._id, name: user.name, email: user.email } };
  },

  async generateAccessAndRefereshTokens(user) {
    try {
      const { accessTokenSecret, accessTokenExpiresIn, refreshTokenExpiresIn, refreshTokenSecret } = getSecret();
      if (!accessTokenSecret) {
        throw new Error("Access token secret is not defined");
      }
      
      const accessToken = (jwt as any).sign(
        {
          id: user._id,
          email: user.email,
          name: user.name
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
      throw createError(
        500,
        "Error while generating referesh and access token"
      );
    }
  }
};
