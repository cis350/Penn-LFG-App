const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('../model/users');
const jwtAuth = require('./controllerUtils/jwtAuth');
const jwt = require('jsonwebtoken');
const app = express();
const addPost = require('../model/userPost')

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// REGISTER ENDPOINT
app.post('/register', async (req, res) => {
  // retrieve body input parameters
  const {
    username, password, fname, lname,
  } = req.body;

  // check if username and password were inputted
  if (!username || !password || !fname || !lname) {
    return res.status(400).json({ error: 'Username, password, first name, and last name are required' });
  }

  // query the database to see if the username already exists
  try {
    const userExists = await users.getUserByUName(username);
    if (userExists) {
      return res.status(409).json({ error: 'Username already exists' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Database error' });
  }

  // if the user doesn't exist already, add the user to the database
  try {
    await users.addUser({
      username, password, fname, lname,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Database error' });
  }
  // if we got here, we should create a new JWT token for the user,
  // since they should now be able to use the app as if they loggen in
  let token;
  try {
    token = jwtAuth.authenticateUser(username);
  } catch (err) {
    // console.log('error with authenticating', err.message);
    res.status(401).json({ error: 'error authenticating newly registered user token' });
  }
  return res.status(201).json({ message: 'User registered successfully', token });
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
    return res.status(500).json({ error: 'Database error' });
  }

  // query the database to check the password and deny or authenticate the user
  let token;
  try {
    const searchResult = await users.getUserByUName(username);
    const storedPassword = searchResult.password;

    // check the password
    if (storedPassword !== password) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    // if we got here, we can authenticate the user's JWT and return 200
    token = jwtAuth.authenticateUser(username);
  } catch (error) {
    return res.status(500).json({ error: 'Database error' });
  }
  return res.status(200).json({ message: 'User logged in successfully', token });
});

// POST ENDPOINT - Create a Post
app.post('/post', async (req, res) => {
  const { token, title, description, course, lookingFor, modeOfCollab, tags } = req.body;

  if (!token || !title || !description || !course || lookingFor === undefined || !modeOfCollab || !tags) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    //Verify user by token
    const verifyStatus = await jwtAuth.verifyUser(token);
    if (verifyStatus !== 0) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  
    //Decode the token to get the username
    const decoded = jwt.verify(token, process.env.KEY);
    const username = decoded.username;
    console.log("Hello", username)
    // Get user's data from username
    const user = await users.getUserByUName(username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const result = await addPost(username, title, description, course, lookingFor, modeOfCollab, tags)
    res.status(201).json({ message: 'Post created successfully', postId: result.insertedId });
  } catch (error) {
    console.log('Error creating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = app;
