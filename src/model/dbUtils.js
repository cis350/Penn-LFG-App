require('dotenv').config();

// import the mongodb driver
const { MongoClient } = require('mongodb');

// the mongodb server URL
const dbURL = process.env.DB_URL;

// MongoDB database connection
let client;
let database;


// connection to the db
const connect = async () => {
  // always use try/catch to handle any exception
  try {
    client = new MongoClient(dbURL);
    database = client.db('PennLFG');

    console.log('connected to db: PennLFG');
    return client; // we return the entire client, not just the DB
  } catch (err) {
    console.log(err.message);
  }
};
/**
 *
 * @returns the database attached to this MongoDB connection
 */
const getDB = async () => {
  // test if there is an active connection
  if (!client) {
    await connect();
  }
  return database;
};

/**
 *
 * Close the mongodb connection
 */
const closeMongoDBConnection = async () => {
  await client.close();
};

// export the functions
module.exports = {
  closeMongoDBConnection,
  getDB,
  connect,
};