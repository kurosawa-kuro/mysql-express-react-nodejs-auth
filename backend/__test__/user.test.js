import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { app } from '../index.js';
import jwt from 'jsonwebtoken';
import { createUser } from "../models/userModel.js";

const prismaClient = new PrismaClient();

beforeEach(async () => {
    await prismaClient.user.deleteMany();
});

afterAll(async () => {
    await prismaClient.$disconnect();
});

describe('POST /api/users/auth', () => {
    it('should authenticate user', async () => {

        const sampleUser = {
            email: 'sample@gmail.com',
            password: 'password',
            name: 'Sample'
        }

        await createUser({
            email: sampleUser.email,
            password: sampleUser.password,
            name: sampleUser.name
        });

        const response = await request(app)
            .post('/api/users/auth')
            .send({ email: sampleUser.email, password: sampleUser.password });

        console.log("Response Body", response.body);
        console.log("response.headers['set-cookie']", response.headers['set-cookie']);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('email');
    });

    // Other test cases...
});

// Other describe blocks...
