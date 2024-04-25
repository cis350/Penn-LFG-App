const dbUtils = require('../model/dbUtils')

const addPost = async (username, title, description, course, lookingFor, modeOfCollab, tags) => {

    //Create a new post
    const db = await dbUtils.getDB();
    const postsCollection = db.collection('Post');
    const newPost = {
      title: title,
      description: description,
      owner: username,
      course: course,
      createdAt: new Date(),
      lookingFor: lookingFor,
      modeOfCollab: modeOfCollab,
      tags: tags
    };

    const result = await postsCollection.insertOne(newPost);
    return result;
}

module.exports = addPost;