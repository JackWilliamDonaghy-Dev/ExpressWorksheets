import { describe, it, expect } from "vitest";
import request from "supertest";
import { Types } from "mongoose";
import { app } from "../../app";
import { CarModel } from "../../models/cars";

// tests/setup.ts connects to MongoDB before these tests run.
// Supertest calls the Express app directly: npm run dev is not needed.
const endpoint = "/api/v1/cars";

describe("Car API: validation and missing records", () => {
    it("shows the year gap: POST rejects 1800 but PUT accepts it", async () => {
        const practiceCar = {
            make: "Vitest practice car",
            model: "Year boundary test",
            year: 1950,
        };

        // Create one temporary record directly so its ID is known for cleanup.
        // 1950 satisfies the Mongoose model's minimum year.
        const car = await CarModel.create(practiceCar);

        try {
            // 1. POST uses createCarZSchema: minimum year is 1950.
            const createResponse = await request(app)
                .post(endpoint)
                .send({ ...practiceCar, year: 1800 });

            expect(createResponse.status).toBe(400);
            expect(createResponse.body.message).toBe("Validation failed");
            expect(createResponse.body.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ path: ["year"] }),
                ])
            );

            // 2. PUT uses updateCarZSchema: minimum year is only 1800.
            // The service also omits runValidators: true on the DB update.
            const updateResponse = await request(app)
                .put(endpoint + "/" + car._id.toString())
                .send({ ...practiceCar, year: 1800 });

            expect(updateResponse.status).toBe(200);
            expect(updateResponse.body.year).toBe(1800);

            // 3. Read it back to prove the inconsistent year was saved.
            const readResponse = await request(app)
                .get(endpoint + "/" + car._id.toString());

            expect(readResponse.status).toBe(200);
            expect(readResponse.body.year).toBe(1800);

            // This documents CURRENT behaviour, rather than fixing it.
            // If both routes should reject years below 1950, change the API
            // and update this test to expect PUT to return 400 too.
        } finally {
            // Runs even when an assertion fails. Only removes our practice car.
            await CarModel.findByIdAndDelete(car._id);
        }
    });

    it("returns 400 when POST is missing the required model", async () => {
        // Arrange and act: make is present, but model is deliberately missing.
        const response = await request(app)
            .post(endpoint)
            .send({ make: "Toyota", year: 2020 });

        // Assert: validation identifies the missing field.
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Validation failed");
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ path: ["model"] }),
            ])
        );
    });

    it("returns 404 when GET uses a valid ID with no matching car", async () => {
        // Generate a correctly formatted MongoDB ID without saving a car.
        // This tests a missing record, rather than a malformed ID.
        const missingId = new Types.ObjectId().toString();

        const response = await request(app)
            .get(endpoint + "/" + missingId);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "Car not found" });
    });
});
