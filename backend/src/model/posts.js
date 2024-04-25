const dbUtils = require('./dbUtils');

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

module.exports = addPost;
