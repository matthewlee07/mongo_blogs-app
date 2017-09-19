const mongoose = require('mongoose');

//this is our schema to represent a blog
const blogPostSchema  = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {
    firstName: String,
    lastName: String
  },
  created: {type: String, default: Date.now}
});