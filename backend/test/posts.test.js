const request = require('supertest');
const jwt = require('jsonwebtoken');
const { getDB, closeMongoDBConnection } = require('../src/model/dbUtils');
const app = require('../src/controller/server');
const {
  deleteTestPostFromDB, insertTestUserToDB, getPostsFromDB,
} = require('./testUtils');

const testUser = {
  username: 'testUser',
  password: 'testPassword',
  fname: 'Test',
  lname: 'User',
};

const newPost = {
  title: 'Sample Post Title',
  description: 'This is a sample description for the post test.',
  course: 'Software Engineering',
  lookingFor: 'Project Partner',
  modeOfCollab: 'Remote',
  tags: ['project', 'collaboration', 'SE'],
};

// TEST POST ENDPOINT
describe('POST /post endpoint integration test', () => {
  let db;
  let token;
  let postId;

  beforeAll(async () => {
    db = await getDB();
    await insertTestUserToDB(db, testUser); // Add a test user to DB
    // Simulate user login to get a valid JWT
    token = jwt.sign({ username: testUser.username }, process.env.KEY);
  });

  afterAll(async () => {
    try {
      if (postId) {
        await deleteTestPostFromDB(db, postId); // Delete the test post from the database
      }
      await closeMongoDBConnection(); // Close the database connection properly.
    } catch (err) {
      console.error('Error in closing the database connection', err);
    }
  });

  test('Create and verify post', async () => {
    const response = await request(app)
      .post('/post')
      .send({ token, ...newPost })
      .expect(201)
      .expect('Content-Type', /json/);

    postId = response.body.postId;
    const data = await getPostsFromDB(db);

    expect(data.some((post) => post.title === newPost.title
      && post.description === newPost.description
      && post.course === newPost.course
      && post.owner === testUser.username
      && post.lookingFor === newPost.lookingFor
      && post.modeOfCollab === newPost.modeOfCollab
      && JSON.stringify(post.tags) === JSON.stringify(newPost.tags))).toBe(true);
  });
});
