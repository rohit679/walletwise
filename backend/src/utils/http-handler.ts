import { Request, Response, NextFunction } from 'express';
export const httpHandler = (
  asyncFn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      try {
        await asyncFn(req, res, next);
      } catch (err) {
        next(err);
      }
    })();
  };
};
