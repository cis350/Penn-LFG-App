/**
 * Utility functions for testing
 */

/**
 * Adds a test student to the DB
 * @param {*} testUser - the test data
 * @param {*} db - the database
 * @returns the id of the data
 */
const insertTestUserToDB = async (db, testUser) => {
  const result = await db.collection('Users').insertOne(testUser);
  return result.insertedId;
};

/**
 *
 * @param {*} db
 * @param {*} testUser
 * @returns
 */
const deleteTestUserFromDB = async (db, testUser) => {
  try {
    const result = await db.collection('Users').deleteMany({ username: testUser });
    const { deletedCount } = result;
    if (deletedCount === 1) {
      console.log('info', 'Successfully deleted test student');
      return true;
    }
    console.log('warning', 'test student was not deleted');
  } catch (err) {
    console.log('error', err.message);
    return err; // Ensure return in catch block
  }
  return false;
};

const deleteTestPostFromDB = async (db, testPostId) => {
  try {
    const result = await db.collection('Post').deleteMany({ _id: testPostId });
    const { deletedCount } = result;
    if (deletedCount === 1) {
      console.log('info', 'Successfully deleted test post');
      return true;
    } if (deletedCount === 0) {
      console.log('warning', 'Test post was not found or already deleted');
      return false;
    }
    console.log('warning', `Unexpected number of posts deleted: ${deletedCount}`);
    return false;
  } catch (err) {
    console.log('error', err.message);
    return err; // Ensure return in catch block
  }
};

/**
 *
 * @param {*} db
 * @returns results from the database
 */
const getDataFromDB = async (db) => {
  try {
    const result = await db.collection('Users').find({}).toArray();
    return result; // Fixed return statement
  } catch (err) {
    console.log('error', err.message);
    return []; // Provide a default return value
  }
};

const getPostsFromDB = async (db) => {
  try {
    const result = await db.collection('Post').find({}).toArray();
    return result; // Return the array of posts from the database.
  } catch (err) {
    console.log('error', err.message);
    return []; // Provide a default return value in case of error.
  }
};

// Export the functions to avoid unused variable errors
module.exports = {
  getDataFromDB,
  insertTestUserToDB,
  deleteTestUserFromDB,
  deleteTestPostFromDB,
  getPostsFromDB,
};
