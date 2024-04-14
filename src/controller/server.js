const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('../model/users');
const jwtAuth = require('./controllerUtils/jwtAuth');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// REGISTER ENDPOINT
app.post('/register', async (req, res) => {

  // retrieve body input parameters
  const { username, password, fname, lname } = req.body;

  // check if username and password were inputted
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // query the database to see if the username already exists
  try {
    const userExists = await users.getUserByUName(username);

    if (userExists) {
      return res.status(409).json({ error: 'Username already exists' });
    }

  } catch (error) {
    return res.status(500).json({ error: 'Database error'});
  }

  // if the user doesn't exist already, add the user to the database
  try {
    await users.addUser({ username, password, fname, lname });
  } catch (error) {
    return res.status(500).json({ error: 'Database error'});
  }

  // if we got here, we should create a new JWT token for the user, since they should now be able to use the app as if they loggen in
  try {
    const token = jwtAuth.authenticateUser(username);
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    console.log('error with authenticating', err.message);
    res.status(401).json({ error: 'error authenticating newly registered user token' });
  }
});

// LOGIN ENDPOINT
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Checking for the presence of username and password
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // query the database to see if the username exists as a registered user
  try {
    const userExists = await users.getUserByUName(username);

    if (!userExists) {
      return res.status(409).json({ error: 'An account with this username does not exist' });
    }

  } catch (error) {
    return res.status(500).json({ error: 'Database error'});
  }

  // query the database to check the password and deny or authenticate the user
  try {
    const searchResult = await users.getUserByUName(username);
    const storedPassword = searchResult.password;

    // check the password
    if (storedPassword !== password) {
      return res.status(401).json( {error: 'Incorrect password.'})
    }

    // if we got here, we can authenticate the user's JWT and return 200
    const token = jwtAuth.authenticateUser(username);
    res.status(200).json({ message: 'User logged in successfully', token });

  } catch (error) {
    return res.status(500).json({ error: 'Database error'});
  }
});

module.exports = app;