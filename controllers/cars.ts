import { Request, Response } from 'express'; 

export class CarController { 

    getCars = async (_req: Request, res: Response): Promise<void> => {
    res.status(200).json({
        success: true,
        data: "this is just dummy for now a response to the get all cars request"
        });
    };
}