import express, { NextFunction } from 'express';
import bodyParser from 'body-parser';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import cors from 'cors';
import { Request, Response } from 'express';

export const createAnApp = () => {
  const app = express();
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      optionsSuccessStatus: 200,
      methods: 'GET, PUT, DELETE, POST',
    })
  );
  app.use(express.static(__dirname + '/public'));
  return app;
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(createError(StatusCodes.NOT_FOUND, `${req.originalUrl} route not found.`));
};

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  res.status(err.statusCode || 500).send({
    message: 'Something unwanted occurred ...',
    error: err.message,
  });
};

export const finishApp = (app: express.Application): void => {
  // Add error handling middleware
  app.use(notFoundHandler);
  app.use(errorHandler);
};
