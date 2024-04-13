// CRUD operations for a user
const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, getDB } = require('./dbUtils');

let database;
let collection;

// sets up the collection and database within mongoDB we're working in
const setUpCollection = async () => {
  try {
    database = await getDB();
    collection = await database.collection('Users');
  } catch (err) {
    console.log(`error: ${err.message}`)
  }
}

/**
 *
 * @param {*} newUser
 * @returns
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

const getAllUsers = async () => {
  try {
    collection.find({}).toArray();
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const getUserByUName = async (username) => {
  try {
    await setUpCollection();
    const result = collection.findOne({ username });
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const updateUser = async (userID, newUName) => {
  try {
    collection.updateOne(
      { _id: ObjectId(userID) },
      { $set: { username: newUName } },
    );
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const deleteUser = async (userID) => {
  try {
    collection.deleteOne(
      { _id: ObjectId(userID) },
    );
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
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