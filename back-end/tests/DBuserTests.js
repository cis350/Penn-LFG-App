const request = require('supertest');
const { closeMongoDBConnection, connect } = require('../model/dbUtils');
const webapp = require('../controller/server');

// get test functions from testUtils
const {
    isInArray, testUser, insertTestDataToDB, deleteTestDataFromDB,
} = require('./testUtils');

// TEST POST ENDPOINT
describe('GET users(s) endpoint integration test', () => {

    let mongo; // local mongo connection
    let db;
    let testUserID;
  
    /**
       * Make sure that the data is in the DB before running
       * any test
       * connect to the DB
       */
    beforeAll(async () => {
      mongo = await connect();
      db = mongo.db();
  
      // add test user to mongodb
      testUserID = await insertTestDataToDB(db, testUser);
    });
  
    /**
   * Delete all test data from the DB
   * Close all open connections
   */
    afterAll(async () => {
      try {
        await deleteTestDataFromDB(db, testUser.username);
        await mongo.close();
        await closeMongoDBConnection(); // mongo client that started server.
      } catch (err) {
        return err;
      }
    });
  
    test('Get all users endpoint status code and data', async () => {
      const resp = await request(webapp).get('/users/');
      expect(resp.status).toEqual(200);
      expect(resp.type).toBe('application/json');
      const usersList = JSON.parse(resp.text).data;
      // testuser is in the response
      // matching nested structures can be frustrating!
      // expect(usersList).toEqual(expect.arrayContaining([{ _id: testUserID, ...testUser }]));
      expect(isInArray(usersList, testUserID)).toBe(true);
    });
  
    test('Get: status code and data', async () => {
      const resp = await request(webapp).get(`/user/${testUserID}`);
      expect(resp.status).toEqual(200);
      expect(resp.type).toBe('application/json');
      const user = JSON.parse(resp.text).data;
      // testStudent is in the response
      expect(JSON.stringify(user)).toBe(JSON.stringify({ _id: testUserID, ...testUser }));
    });
  
    test('user not in db status code 404', async () => {
      const resp = await request(webapp).get('/user/1');
      expect(resp.status).toEqual(404);
      expect(resp.type).toBe('application/json');
    });
  });

// TEST DELETE ENDPOINT
describe('DELETE user endpoint integration test', () => {
    test('Delete user endpoint status code and response', async () => {
      // Assuming the test user was inserted in the beforeAll hook
      const deleteResp = await request(webapp).delete(`/user/${testUserID}`);
      expect(deleteResp.status).toEqual(200);
      expect(deleteResp.text).toContain('User deleted successfully');
  
      // Verify the user has been deleted by attempting to fetch it
      const fetchResp = await request(webapp).get(`/user/${testUserID}`);
      expect(fetchResp.status).toEqual(404);
    });
  });
  
  // TEST UPDATE ENDPOINT
  describe('UPDATE user endpoint integration test', () => {
    let updatedTestUserID;
  
    // Insert a new test user to be updated
    beforeAll(async () => {
      updatedTestUserID = await insertTestDataToDB(db, testUser);
    });
  
    test('Update user details status code and response', async () => {
      const newDetails = {
        username: "updatedTestUser",
        email: "updatedTestUser@example.com"
        // Add other fields as necessary
      };
      
      const updateResp = await request(webapp).put(`/user/${updatedTestUserID}`).send(newDetails);
      expect(updateResp.status).toEqual(200);
      expect(updateResp.text).toContain('User updated successfully');
  
      // Fetch the updated user to verify changes
      const fetchResp = await request(webapp).get(`/user/${updatedTestUserID}`);
      const fetchedUser = JSON.parse(fetchResp.text).data;
      expect(fetchedUser.username).toEqual(newDetails.username);
      expect(fetchedUser.email).toEqual(newDetails.email);
    });
  
    // Clean up the newly inserted test user
    afterAll(async () => {
      await deleteTestDataFromDB(db, testUser.username);
    });
  });