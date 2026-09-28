import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate = (schema: z.ZodObject<any>)   => (req: Request, res: Response, next: NextFunction) : void => {

    console.log("request body: ", req.body);
  const validation = schema.safeParse(req.body);
    console.log("validation result: ", validation);

  if (!validation.success) {
    res.status(400).json({
      message: 'Validation failed',
      errors: validation.error.issues
    });
    return;
  }

  req.body = validation.data

  next();
};
