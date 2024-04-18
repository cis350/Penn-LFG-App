/**
 * Utility functions for testing
 */
// const testUser = {
//   username: 'testUser',
//   password: 'cis3500',
//   fname: 'Adam',
//   lname: 'Nomani',
// };  // Removed unused variable warning by removing or exporting if needed

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

// Export the functions to avoid unused variable errors
module.exports = {
  getDataFromDB,
  insertTestUserToDB,
  deleteTestUserFromDB,
};
