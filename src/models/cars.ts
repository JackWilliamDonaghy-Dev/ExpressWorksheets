import { Schema, model } from 'mongoose';

export interface ICar {
  make: string;
  model: string;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateCarInput:
 *       type: object
 *       required:
 *         - make
 *         - model
 *       properties:
 *         make:
 *           type: string
 *           example: Renault
 *         model:
 *           type: string
 *           example: Megane
 *         year:
 *           type: integer
 *           example: 2010
 */

const carSchema = new Schema<ICar>(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
  },
  { timestamps: true }
);

export const CarModel = model<ICar>('Car', carSchema);

