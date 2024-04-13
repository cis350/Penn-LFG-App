/**
 * utility functions for testing
 */
const testUser = {
  username: 'testUser',
  password: 'cis3500',
  fname: 'Adam',
  lname: 'Nomani'
};
/**
 * Adds a test student to the DB
 * @param {*} testData - the test data
 * @param {*} db - the database
 * @returns the id of the data
 */
const insertTestDataToDB = async (db, testData) => {
  const result = await db.collection('Users').insertOne(testData);
  return result.insertedId;
};
/**
 *
 * @param {*} db
 * @param {*} testData
 * @returns
 */
const deleteTestDataFromDB = async (db, testData) => {
  try {
    const result = await db.collection('Users').deleteMany({ username: testData });
    const { deletedCount } = result;
    if (deletedCount === 1) {
      console.log('info', 'Successfully deleted test student');
    } else {
      console.log('warning', 'test student was not deleted');
    }
  } catch (err) {
    console.log('error', err.message);
  }
};

/**
 *
 * @param {*} db
 * @param {*} testData
 * @returns
 */
const getDataFromDB = async (db) => {
  try {
    const result = await db.collection('Users').find({}).toArray();
    return result
  } catch (err) {
    console.log('error', err.message);
  }
};

// export the functions
module.exports = {
  getDataFromDB,
  insertTestDataToDB,
  deleteTestDataFromDB,  
};