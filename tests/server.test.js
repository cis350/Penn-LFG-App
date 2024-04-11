const request = require('supertest');
const { app } = require('../controllers/server');
const jwt = require('jsonwebtoken');

const secretKey = 'c1edf6d2f856bd9db8eba0be38f907055319d63625c0d4c068389de3232e1473'; // Use the same secret key as in your app

describe('User Authentication Endpoints', () => {
  describe('POST /register', () => {
    it('should register a new user and return a token', async () => {
      const newUser = {
        username: 'newUser2',
        password: 'password123',
        fname: "Test",
        lname: "Test"
      };

      const response = await request(app).post('/register').send(newUser);
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe('User registered successfully');

      // Verify that a token is returned
      expect(response.body).toHaveProperty('token');
      const decodedToken = jwt.verify(response.body.token, secretKey);
      expect(decodedToken).toHaveProperty('username', newUser.username);

      if (response.statusCode !== 201) {
        console.error('Error response:', response.body); // Print the entire error response
      }
    });
  });

  describe('POST /login', () => {
    it('should login a user and return a token', async () => {
      const userCredentials = {
        username: 'newUser1', // Ensure this user is already registered in your database
        password: 'password123'
      };

      const response = await request(app).post('/login').send(userCredentials);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('User logged in successfully');

      // Verify that a token is returned
      expect(response.body).toHaveProperty('token');
      const decodedToken = jwt.verify(response.body.token, secretKey);
      expect(decodedToken).toHaveProperty('username', userCredentials.username);

      if (response.statusCode !== 200) {
        console.error('Error response:', response.body); // Print the entire error response
      }
    });
  });
});
