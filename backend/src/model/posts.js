const dbUtils = require('./dbUtils');
const { ObjectId } = require('mongodb');

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

const getPostById = async (postId) => {
  const db = await dbUtils.getDB();
  const id = new ObjectId(postId);
  const postsCollection = db.collection('Post');
  const post = await postsCollection.findOne({ _id: id });
  return post;
};

const updatePost = async (postId, updateFields) => {
  const db = await dbUtils.getDB();
  const id = new ObjectId(postId);
  const postsCollection = db.collection('Post');
  const result = await postsCollection.updateOne({ _id: id }, { $set: updateFields });
  return result;
};

const deletePost = async (postId) => {
  const db = await dbUtils.getDB();
  const id = new ObjectId(postId);
  const postsCollection = db.collection('Post');
  const result = await postsCollection.deleteOne({ _id: id });
  return result;
};

const getAllPosts = async () => {
  const db = await dbUtils.getDB();
  const postsCollection = db.collection('Post');
  const allPosts = await postsCollection.find({}).toArray();
  return allPosts;
};



module.exports = { addPost, getPostById, updatePost, deletePost, getAllPosts };
