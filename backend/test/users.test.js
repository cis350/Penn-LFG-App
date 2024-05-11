const request = require('supertest');
const { getDB, closeMongoDBConnection } = require('../src/model/dbUtils');
const app = require('../src/controller/server');
const { getDataFromDB, deleteTestUserFromDB } = require('./testUtils');

const newUser = {
  username: 'drake',
  password: 'jcole',
  fname: 'Adam',
  lname: 'Nomani',
};

// TEST POST ENDPOINT
describe('GET users(s) endpoint integration test', () => {
  let db; // Local mongo connection

  /**
   * Make sure that the data is in the DB before running
   * any test
   * connect to the DB
   */
  beforeAll(async () => {
    db = await getDB();
  }, 10000);

  /**
   * Delete all test data from the DB
   * Close all open connections
   */
  afterAll(async () => {
    try {
      await deleteTestUserFromDB(db, newUser.username);
      await closeMongoDBConnection(); // Close the database connection properly.
    } catch (err) {
      console.error('Error in closing the database connection', err);
    }
  }, 10000);

  test('Register and delete user', async () => {
    await request(app)
      .post('/register')
      .send(newUser)
      .expect(201);

    let data = await getDataFromDB(db);
    expect(data.some((user) => user.username === 'drake' && user.password === 'jcole' && user.fname === 'Adam' && user.lname === 'Nomani')).toBe(true);

    await deleteTestUserFromDB(db, newUser.username);
    data = await getDataFromDB(db);
    expect(data.some((user) => user.username === 'drake')).toBe(false);
  });
});
