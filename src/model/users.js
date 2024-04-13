const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, getDB } = require('./dbUtils');

let database;
let collection;

/**
 * Sets up the collection and database within MongoDB we're working in.
 */
const setUpCollection = async () => {
  try {
    database = await getDB();
    collection = await database.collection('Users');
  } catch (err) {
    console.log(`error: ${err.message}`)
  }
}

/**
 * Adds a new user to the database.
 * @param {Object} newUser - The new user's data.
 * @returns {Promise<string>} The newly created user's ID.
 */
const addUser = async (newUser) => {
  try {
    await setUpCollection();
    const result = await collection.insertOne(newUser);
    console.log(`New user created with id: ${result.insertedId}`);
    return result.insertedId;
  } catch (err) {
    console.log(`addUser error: ${err.message}`);
  }
};

/**
 * Retrieves all users from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of users.
 */
const getAllUsers = async () => {
  try {
    const result = await collection.find({}).toArray();
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

/**
 * Finds a user by their username.
 * @param {string} username - The username to search for.
 * @returns {Promise<Object>} A promise that resolves to the user object if found.
 */
const getUserByUName = async (username) => {
  try {
    await setUpCollection();
    const result = await collection.findOne({ username });
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

/**
 * Updates a user's username.
 * @param {string} userID - The ID of the user to update.
 * @param {string} newUName - The new username to set.
 * @returns {Promise<Object>} A promise that resolves to the update operation result.
 */
const updateUser = async (userID, newUName) => {
  try {
    const result = await collection.updateOne(
      { _id: ObjectId(userID) },
      { $set: { username: newUName } },
    );
    return result;
  } catch (err) {
    console.log(`updateUser error: ${err.message}`);
  }
};

/**
 * Deletes a user by their ID.
 * @param {string} userID - The ID of the user to delete.
 * @returns {Promise<Object>} A promise that resolves to the delete operation result.
 */
const deleteUser = async (userID) => {
  try {
    const result = await collection.deleteOne({ _id: ObjectId(userID) });
    return result;
  } catch (err) {
    console.log(`deleteUser error: ${err.message}`);
  }
};

// export the functions
module.exports = {
  addUser,
  getAllUsers,
  getUserByUName,
  updateUser,
  deleteUser,
};
