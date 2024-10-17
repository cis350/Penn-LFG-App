const { ObjectId } = require('mongodb');
const dbUtils = require('./dbUtils');
/**
 * Adds a new post to the database.
 * @param {string} username - The username of the post owner.
 * @param {string} title - The title of the post.
 * @param {string} description - The description of the post.
 * @param {string} course - The course related to the post.
 * @param {string} lookingFor - What the post owner is looking for (e.g., team members, advice).
 * @param {string} modeOfCollab - The preferred mode of collaboration (e.g., online, in-person).
 * @param {Array<string>} tags - Tags associated with the post for categorization.
 * @returns {Promise<Object>} A promise that resolves to the result of the insert operation.
 */


const addPost = async (username, title, description, course, lookingFor, modeOfCollab, tags) => {
  // Create a new post
  const db = await dbUtils.getDB();
  const postsCollection = db.collection('Post');
  const newPost = {
    title,
    description,
    owner: username,
    course,
    createdAt: new Date(),
    lookingFor,
    modeOfCollab,
    tags,
  };

  const result = await postsCollection.insertOne(newPost);
  return result;
};


/**
 * Retrieves a post by its ID from the database.
 * @param {string} postId - The ID of the post to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the post object if found, otherwise null.
 */
const getPostById = async (postId) => {
  const db = await dbUtils.getDB();
  const id = new ObjectId(postId);
  const postsCollection = db.collection('Post');
  const post = await postsCollection.findOne({ _id: id });
  return post;
};

/**
 * Updates a post by its ID.
 * @param {string} postId - The ID of the post to update.
 * @param {Object} updateFields - An object containing the fields to update.
 * @returns {Promise<Object>} A promise that resolves to the result of the update operation.
 */
const updatePost = async (postId, updateFields) => {
  const db = await dbUtils.getDB();
  const id = new ObjectId(postId);
  const postsCollection = db.collection('Post');
  const result = await postsCollection.updateOne({ _id: id }, { $set: updateFields });
  return result;
};

/**
 * Deletes a post by its ID.
 * @param {string} postId - The ID of the post to delete.
 * @returns {Promise<Object>} A promise that resolves to the result of the delete operation.
 */
const deletePost = async (postId) => {
  const db = await dbUtils.getDB();
  const id = new ObjectId(postId);
  const postsCollection = db.collection('Post');
  const result = await postsCollection.deleteOne({ _id: id });
  return result;
};

/**
 * Retrieves all posts from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of all posts.
 */
const getAllPosts = async () => {
  const db = await dbUtils.getDB();
  const postsCollection = db.collection('Post');
  const allPosts = await postsCollection.find({}).sort({ createdAt: -1 }).toArray();
  return allPosts;
};

/**
 * Retrieves all posts from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of all posts.
 */
const getMyPosts = async (username) => {
  const db = await dbUtils.getDB();
  const postsCollection = db.collection('Post');
  const userPosts = await postsCollection.find({ owner: username }).toArray();
  return userPosts;
};

module.exports = {
  addPost, getPostById, updatePost, deletePost, getAllPosts, getMyPosts,
};
