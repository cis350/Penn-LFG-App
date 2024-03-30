const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

const dataApiUrl = 'https://data.mongodb-api.com/app/data-ypskn/endpoint/data/v1';
const apiKey = 'tarL8zCA9wSPkYeUxstI7GQmQqFO7s5c03rHOHaUnl89M0EYqY2EgOKoDpAFI11R';
const dataSource = 'Cluster0';

// Function to interact with MongoDB Data API
const mongoDBRequest = async (action, params) => {
  try {
    const { data } = await axios.post(`${dataApiUrl}/action/${action}`, params, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      }
    });
    return { success: true, data };
  } catch (error) {
    console.error('MongoDB Data API Request Error:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

// Register endpoint
app.post('/register', async (req, res) => {
    const { username, password, fname, lname } = req.body;

    // First, check if a user with the given username already exists
    const checkUserParams = {
        collection: 'Users',
        database: 'PennLFG',
        dataSource,
        filter: { username } // Check for existing username
    };

    const checkUserResult = await mongoDBRequest('findOne', checkUserParams);

    if (checkUserResult.success && checkUserResult.data.document) {
        // If a user is found, return an error response
        return res.status(409).json({ message: 'Username already exists' });
    }

    // If no user is found, proceed with registration
    const params = {
        collection: 'Users',
        database: 'PennLFG',
        dataSource,
        document: { username, password, fname, lname }, // TODO: Consider hashing the password before sending
    };

    const { success, data, error } = await mongoDBRequest('insertOne', params);

    if (success) {
        res.status(201).json({ message: 'User registered successfully', data });
    } else {
        res.status(500).json({ message: 'Error registering user', error });
    }
});


// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const params = {
    collection: 'Users',
    database: 'PennLFG',
    dataSource,
    filter: { username, password } // TODO: Compare hashed password
  };

  const { success, data } = await mongoDBRequest('findOne', params);

  if (success && data.document) {
    // TODO: Generate and send back a token instead of user data
    res.status(200).json({ message: 'User logged in successfully', data: data.document });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

if (require.main === module) {
    // Only start the server if the file is run directly
    const port = 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
  
  module.exports = { app, mongoDBRequest };