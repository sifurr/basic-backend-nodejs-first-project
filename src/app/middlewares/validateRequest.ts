import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

// middleware for validating data before hitting the controller route
const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validation
      await schema.parseAsync({ body: req.body });
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
