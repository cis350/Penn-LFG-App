const { ObjectId } = require('mongodb');
const dbUtils = require('./dbUtils');

const addPost = async (username, title, description, course, lookingFor, modeOfCollab, tags) => {
  console.log("add post got called")
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
  console.log("get all posts got called")
  const db = await dbUtils.getDB();
  const postsCollection = db.collection('Post');
  const allPosts = await postsCollection.find({}).sort({createdAt:-1}).toArray();
  return allPosts;
};

const getMyPosts = async (username) => {
  const db = await dbUtils.getDB();
  const postsCollection = db.collection('Post');
  const userPosts = await postsCollection.find({ owner: username }).toArray();
  return userPosts;
};

module.exports = {
  addPost, getPostById, updatePost, deletePost, getAllPosts,
};
