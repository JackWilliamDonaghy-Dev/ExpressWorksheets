import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../../app";

// import { connectDB,  } from "../../config/database";

// beforeAll(async () => {
//     console.log('Run once before tests');
//    await connectDB();
// });

describe('GET /cars', () => {

    it('returns all cars', async () => {

        const response = await request(app)
            .get('/api/v1/cars');

        expect(response.status).toBe(200);

    });

});
