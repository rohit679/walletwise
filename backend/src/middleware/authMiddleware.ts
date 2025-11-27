import jwt from 'jsonwebtoken';
import createError from 'http-errors-lite';
import { StatusCodes } from 'http-status-codes';
import { getSecret } from '../configuration';
import { httpHandler } from '../utils/http-handler';
import { UserModel } from '../modules/auth/user.model';
import { BlackListTokenModel } from '../modules/auth/blacklistToken.model';

export const authMiddleware = httpHandler(async (req, res, next) => {
  try {
    const token =
      (req.cookies && req.cookies.accessToken) ||
      (req.header('Authorization') && req.header('Authorization').replace('Bearer ', ''));
    if (!token) {
      throw createError(StatusCodes.UNAUTHORIZED, 'Unauthorized request');
    }

    const isBlacklisted = await BlackListTokenModel.findOne({ token }).lean();
    if (isBlacklisted) {
      throw createError(StatusCodes.UNAUTHORIZED, 'Token has been expired');
    }

    const { accessTokenSecret } = getSecret();
    const decodedToken: any = jwt.verify(token, accessTokenSecret);
    const user: any = await UserModel.findById(decodedToken && decodedToken.id, {
      __v: 0,
      password: 0,
    }).lean();

    if (!user || !user.refreshToken) {
      throw createError(StatusCodes.UNAUTHORIZED, 'Invalid access token');
    }

    (req as any).user = {
      id: user._id,
      email: user.email,
      name: user.name,
      token: token,
    };
    next();
  } catch (err) {
    throw createError(
      StatusCodes.UNAUTHORIZED,
      `${(err && err.message) || 'Invalid access token'}`
    );
  }
});
