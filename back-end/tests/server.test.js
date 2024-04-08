const request = require('supertest');
const { app } = require('../controllers/server');

describe('User Authentication Endpoints', () => {
    describe('POST /register', () => {
        it('should register a new user', async () => {
            const newUser = {
                username: 'newUser',
                password: 'password123',
                fname: "Test",
                lname: "Test"
            };
          
            const response = await request(app).post('/register').send(newUser);
            expect(response.statusCode).toBe(201);
            expect(response.body.message).toBe('User registered successfully');
          
            if (response.statusCode !== 201) {
                console.error('Error response:', response.body); // Print the entire error response
            }
        });
    });

    describe('POST /login', () => {
        it('should login a user', async () => {
        const userCredentials = {
            username: 'newUser', // Replace with a username that exists in the database
            password: 'password123' // Replace with the corresponding password
        };

        const response = await request(app).post('/login').send(userCredentials);
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('User logged in successfully');
            
            if (response.statusCode === 201) {
                console.log(response.body); // Print the entire response
            }

        });
    });
});
