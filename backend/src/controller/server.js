const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('../model/users');
const jwtAuth = require('./controllerUtils/jwtAuth');
const posts = require('../model/posts');

const app = express();

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

// VERIFY AUTHENTICATION ENDPOINT - Check if a user has a valid JWT token
app.post('/verify', async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  let verifyStatus;
  try {
    verifyStatus = await jwtAuth.verifyUser(token);
  } catch (error) {
    console.log('Error verifying user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
  if (verifyStatus !== 0) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  return res.status(200).json({ message: 'User verified successfully' });
});

// LOGOUT ENDPOINT
app.post('/logout', async (req, res) => {
  // verify the session
  console.log('logout', req.headers.authorization);
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({ error: 'No valid session token present.' });
  }
  let verifyStatus;
  try {
    verifyStatus = await jwtAuth.verifyUser(token);
    if (verifyStatus === 1) { // expired session
      return res.status(403).json({ message: 'Session expired already' });
    }
    if (verifyStatus === 2 || verifyStatus === 3) { // invalid user or jwt
      return res.status(401).json({ message: 'Invalid user or session' });
    }
    // session valid blacklist the JWT
    jwtAuth.blacklistJWT(token);
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
  return res.status(200).json({ message: 'Session terminated' });
});

// POST ENDPOINT - Create a Post
app.post('/post', async (req, res) => {
  const token = req.headers.authorization;
  const {
    title,
    description,
    course,
    lookingFor,
    modeOfCollab,
    tags,
  } = req.body;
  console.log(token)
  // if (!token || !title || !description || !course
  //   || lookingFor === undefined || !modeOfCollab || !tags) {
  //   return res.status(400).json({ error: 'All fields are required' });
  // }

  if (typeof title !== 'string' || title.trim().length === 0
      || typeof description !== 'string' || description.trim().length === 0
      || typeof course !== 'string' || course.trim().length === 0
      || typeof lookingFor !== 'number' || lookingFor <= 0
      || typeof modeOfCollab !== 'string' || modeOfCollab.trim().length === 0
      || !Array.isArray(tags) || tags.some((tag) => typeof tag !== 'string')) {
    return res.status(400).json({ error: 'Invalid field types or values' });
  }

  let result;
  try {
    // Verify user by token
    const verifyStatus = await jwtAuth.verifyUser(token);
    if (verifyStatus !== 0) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Decode the token to get the username
    const decoded = jwt.verify(token, process.env.KEY);
    const { username } = decoded;
    console.log('Hello', username);

    // Get user's data from username
    const user = await users.getUserByUName(username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    result = await posts.addPost(username, title, description, course, lookingFor, modeOfCollab, tags);
  } catch (error) {
    console.log('Error creating post:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
  return res.status(201).json({ message: 'Post created successfully', postId: result.insertedId });
});

app.put('/post/:id', async (req, res) => {
  const token = req.headers.authorization;
  const postId = req.params.id;

  let updateFields = {};
  const allowedFields = ['title', 'description', 'course', 'lookingFor', 'modeOfCollab', 'tags'];
  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      updateFields[field] = req.body[field];
    }
  });

  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({ error: 'No valid fields provided for update' });
  }

  try {
    // Verify user by token
    const verifyStatus = await jwtAuth.verifyUser(token);
    if (verifyStatus !== 0) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Decode the token to get the username
    const decoded = jwt.verify(token, process.env.KEY);
    const { username } = decoded;

    // Get user's data from username
    // const user = await users.getUserByUName(username);
    // console.log("Username" + username)
    // console.log("User:"+ user)
    // if (!user) {
    //   return res.status(404).json({ error: 'User not found' });
    // }

    // Check if the user is the owner of the post
    const post = await posts.getPostById(postId);
    console.log(post)
    if (!post || post.owner !== username) {
      return res.status(403).json({ error: 'Unauthorized to edit this post' });
    }

    // Update the post
    const result = await posts.updatePost(postId, updateFields);
    if (!result) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    console.log('Error updating post:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/post/:postId', async (req, res) => {
  const { postId } = req.params;
  const token = req.headers.authorization;

  try {
    // Verify user by token
    const verifyStatus = await jwtAuth.verifyUser(token);
    if (verifyStatus !== 0) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Decode the token to get the username
    const decoded = jwt.verify(token, process.env.KEY);
    const { username } = decoded;

    // Get user's data from username
    // const user = await users.getUserByUName(username);
    // if (!user) {
    //   return res.status(404).json({ error: 'User not found' });
    // }

    // Check if the user is the owner of the post
    const post = await posts.getPostById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (post.owner !== username) {
      return res.status(403).json({ error: 'Unauthorized to delete this post' });
    }

    // Delete the post
    const deleteResult = await posts.deletePost(postId);
    if (!deleteResult) {
      return res.status(500).json({ error: 'Failed to delete the post' });
    }

    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.log('Error deleting post:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/posts', async (req, res) => {
  try {
    const allPosts = await posts.getAllPosts();
    return res.status(200).json(allPosts);
  } catch (error) {
    console.log('Error retrieving posts:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = app;
