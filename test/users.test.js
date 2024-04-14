const request = require('supertest');
const { getDB, closeMongoDBConnection } = require('../src/model/dbUtils');
const app = require('../src/controller/server');
const { getDataFromDB, deleteTestDataFromDB } = require('./testUtils');

const newUser = {
  username: 'drake',
  password: 'jcole',
  fname: 'Adam',
  lname: 'Nomani',
};

// TEST POST ENDPOINT
describe('GET users(s) endpoint integration test', () => {
    
    let db; // local mongo connection

    /**
     * Make sure that the data is in the DB before running
     * any test
     * connect to the DB
     */
    beforeAll(async () => {
        db = await getDB();
    });

    /**
     * Delete all test data from the DB
     * Close all open connections
     */
    afterAll(async () => {
        try {
            await closeMongoDBConnection(); // mongo client that started server.
        } catch (err) {
            return err;
        }
    });

  test('Register and delete user', async () => {
    const response = await request(app)
        .post('/register')
        .send(newUser);

    let data = await getDataFromDB(db);
    expect(data.some(user => user.username === 'drake' && user.password === 'jcole' && user.fname === 'Adam' && user.lname === 'Nomani')).toBe(true);
    await deleteTestDataFromDB(db, newUser.username);
    data = await getDataFromDB(db);
    expect(data.some(user => user.username === 'drake')).toBe(false);
    });
});