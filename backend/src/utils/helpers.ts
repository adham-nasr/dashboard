import type { Request, Response, NextFunction } from 'express';

export const asyncHandler =
  (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

  export const regexes = {
    email : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  }