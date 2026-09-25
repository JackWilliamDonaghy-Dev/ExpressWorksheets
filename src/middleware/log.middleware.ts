import { Request, Response, NextFunction } from 'express';

export const logRequest = (req: Request, _res: Response, next: NextFunction): Promise<void> =>{   

    console.log(`${req.method} ${req.originalUrl}`); 
    
    next(); 
    return Promise.resolve();
}