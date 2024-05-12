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
  lookingFor: 2,
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
  }, 20000);

  afterAll(async () => {
    try {
      if (postId) {
        await deleteTestPostFromDB(db, postId); // Delete the test post from the database
      }
      await closeMongoDBConnection(); // Close the database connection properly.
    } catch (err) {
      console.error('Error in closing the database connection', err);
    }
  }, 20000);

  test('Create and verify post', async () => {
    const response = await request(app)
      .post('/post')
      .send(newPost)
      .set('Authorization', token)
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

  describe('PUT /post/:id endpoint integration test', () => {
    test('Edit post with valid data', async () => {
      const updatedPost = {
        title: 'Updated Title',
        description: 'Updated Description',
        course: 'Updated Course',
        lookingFor: 3,
        modeOfCollab: 'In-person',
        tags: ['updated', 'test']
      };

      const response = await request(app)
        .put(`/post/${postId}`)
        .send(updatedPost)
        .set('Authorization', token)
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('message', 'Post updated successfully');
    });

    test('Fail to edit post with invalid token', async () => {
      const updatedPost = {
        title: 'Updated Title',
        description: 'Updated Description',
        course: 'Updated Course',
        lookingFor: 3,
        modeOfCollab: 'In-person',
        tags: ['updated', 'test']
      };

      await request(app)
        .put(`/post/${postId}`)
        .send(updatedPost)
        .set('Authorization', 'Bearer invalid_token')
        .expect(401);
    });
  });

  describe('DELETE /post/:id endpoint integration test', () => {
    test('Delete post with valid token', async () => {
      const response = await request(app)
        .delete(`/post/${postId}`)
        .set('Authorization', token)
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('message', 'Post deleted successfully');
    });

    test('Fail to delete post with invalid token', async () => {
      await request(app)
        .delete(`/post/${postId}`)
        .set('Authorization', 'Bearer invalid_token')
        .expect(401);
    });
  });

describe('GET /posts endpoint integration test', () => {
  test('Retrieve all posts with valid token', async () => {
    const response = await request(app)
      .get('/posts')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach(post => {
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('description');
      expect(post).toHaveProperty('course');
      expect(post).toHaveProperty('lookingFor');
      expect(post).toHaveProperty('modeOfCollab');
      expect(post).toHaveProperty('tags');
    });
  });


});
});
