const request = require('supertest');
const { closeMongoDBConnection, connect } = require('../src/model/dbUtils');
const {app} = require('../src/controller/server');
const users = require('../src/model/users');

// const {getAllUsers} = require('../src/model/users')
const newUser = {
  username: 'drake',
  password: 'jcole',
  fname: 'Adam',
  lname: 'Nomani'
};
// import test utilities function
const {
  getDataFromDB, insertTestDataToDB, deleteTestDataFromDB,
} = require('./testUtils');

// TEST POST ENDPOINT
describe('GET users(s) endpoint integration test', () => {
  /**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add -'jest': true-
*/
  let client; // local mongo connection
  const dbName = 'PennLFG';
  let db;

  /**
     * Make sure that the data is in the DB before running
     * any test
     * connect to the DB
     */
  beforeAll(async () => {
    
    client = await connect();
    db = client.db(dbName);

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
        .send(newUser)
    console.log(response);

    let data = await getDataFromDB(db);
    expect(data.some(user => user.username === 'drake' && user.password === 'jcole' && user.fname === 'Adam' && user.lname === 'Nomani')).toBe(true);
    await deleteTestDataFromDB(db, newUser.username);
    data = await getDataFromDB(db);
    expect(data.some(user => user.username === 'drake')).toBe(false);
  });
});