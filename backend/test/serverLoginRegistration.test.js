const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/controller/server');
const { deleteTestUserFromDB } = require('./testUtils');
const { closeMongoDBConnection, getDB } = require('../src/model/dbUtils');

describe('API endpoint testing', () => {
  let db;
  const testUser = {
    username: 'testuser',
    password: 'testpassword',
    fname: 'Test',
    lname: 'User',
  };

  beforeAll(async () => {
    db = await getDB();
  });

  afterAll(async () => {
    await deleteTestUserFromDB(db, testUser.username);
    await closeMongoDBConnection();
  });

  describe('POST /register', () => {
    it('should register a user and return a JWT', async () => {
      const response = await request(app)
        .post('/register')
        .send(testUser)
        .expect(201)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('token');
      const decoded = jwt.verify(response.body.token, process.env.KEY);
      expect(decoded).toHaveProperty('username', testUser.username);
    });

    it('should fail with 400 if username or password is missing', async () => {
      await request(app)
        .post('/register')
        .send({ fname: 'Test', lname: 'User' })
        .expect(400);
    });

    it('should fail with 409 if username already exists', async () => {
      await request(app)
        .post('/register')
        .send(testUser)
        .expect(409);
    });
  });

  describe('POST /login', () => {
    it('should log in a user and return a JWT', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          username: testUser.username,
          password: testUser.password,
        })
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('token');
      const decoded = jwt.verify(response.body.token, process.env.KEY);
      expect(decoded).toHaveProperty('username', testUser.username);
    });

    it('should fail with 400 if username or password is missing', async () => {
      await request(app)
        .post('/login')
        .send({})
        .expect(400);
    });

    it('should fail with 409 if username does not exist', async () => {
      await request(app)
        .post('/login')
        .send({
          username: 'nonexistentuser',
          password: 'password',
        })
        .expect(409);
    });

    it('should fail with 401 if password is incorrect', async () => {
      await request(app)
        .post('/login')
        .send({
          username: testUser.username,
          password: 'wrongpassword',
        })
        .expect(401);
    });
  });
});
