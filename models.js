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

blogPostSchema.virtual('authorName').get(function(){
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blogPostSchema.methods.apiRepr = function(){
  return {
    id: this._id, 
    title: this.title,
    content: this.content,
    author: this.authorName,
    created: this.created
  }
}

const BlogPost = mongoose.model('blog', blogPostSchema);
module.exports = {BlogPost};