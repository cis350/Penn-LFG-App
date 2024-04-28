const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/controller/server');
const { closeMongoDBConnection, getDB } = require('../src/model/dbUtils');
const { deleteTestUserFromDB, deleteTestPostFromDB } = require('./testUtils');

describe('POST /post endpoint testing', () => {
  let db;
  let token;
  const userData = {
    username: 'testuser',
    password: 'testpassword',
    fname: 'Test',
    lname: 'User',
  };

  beforeAll(async () => {
    db = await getDB();
    // Setup a user and get a valid token
    await request(app).post('/register').send(userData);
    const loginResponse = await request(app).post('/login').send({ username: userData.username, password: userData.password });
    token = loginResponse.body.token;
  });

  afterAll(async () => {
    await deleteTestUserFromDB(db, userData.username);
    await closeMongoDBConnection();
  });

  describe('Creating a post', () => {
    it('should successfully create a post when all required fields are provided', async () => {
      const postData = {
        token,
        title: 'Test Title',
        description: 'Test Description',
        course: 'Test Course',
        lookingFor: 'partners',
        modeOfCollab: 'online',
        tags: ['tag1', 'tag2'],
      };

      const response = await request(app)
        .post('/post')
        .send(postData)
        .expect(201)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('message', 'Post created successfully');
      expect(response.body).toHaveProperty('postId');
      await deleteTestPostFromDB(db, response.body.postId);
    });

    it('should return a 400 error if any required field is missing', async () => {
      const incompleteData = {
        token,
        title: 'Test Title',
        description: 'Test Description',
        course: 'Test Course',
        // lookingFor, modeOfCollab, and tags are intentionally missing
      };

      await request(app)
        .post('/post')
        .send(incompleteData)
        .expect(400);
    });

    it('should return a 401 error if the token is invalid', async () => {
      const invalidTokenData = {
        token: 'invalidToken',
        title: 'Test Title',
        description: 'Test Description',
        course: 'Test Course',
        lookingFor: 'partners',
        modeOfCollab: 'online',
        tags: ['tag1', 'tag2'],
      };

      await request(app)
        .post('/post')
        .send(invalidTokenData)
        .expect(401);
    });

    it('should return a 401 error if the user does not exist', async () => {
      const wrongUserToken = jwt.sign({ username: 'nonexistentuser' }, process.env.KEY);
      const wrongUserData = {
        token: wrongUserToken,
        title: 'Test Title',
        description: 'Test Description',
        course: 'Test Course',
        lookingFor: 'partners',
        modeOfCollab: 'online',
        tags: ['tag1', 'tag2'],
      };

      await request(app)
        .post('/post')
        .send(wrongUserData)
        .expect(401);
    });
  });
});
