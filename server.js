const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
/*
function require = {
  PORT: require.PORT, 
  DATABASE_URL: require.DATABASE_URL
}
*/
const { PORT, DATABASE_URL } = require('./config');
const {BlogPost} = require('./models');

const app = express();
app.use(bodyParser.json());



app.get('/posts', (req, res) => {
  BlogPost
  .find()
  .limit(20)
  .then(blogPosts => {
    res.json({
      blogPosts: blogPosts.map(
        (blogPost) => blogPost.apiRepr()
      )
    });
  })
  .catch(
    err =>{
      console.error(err);
      res.sendStatus(500);    
    });
});

app.get('/posts/:id', (req, res) => {
  res.sendStatus(500);
})

app.post('/posts/', (req, res) => {
  res.sendStatus(500);
})

app.put('/posts/:id', (req, res) => {
  res.sendStatus(500);
})

app.delete('/posts/:id', (req, res) => {
  res.sendStatus(500);
})

let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};

console.log(DATABASE_URL);