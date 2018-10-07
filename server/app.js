const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoSchema = require('../database');

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').load();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'text/html' }));

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

let stagingData = null;

app.post('/post/stage', (req, res) => {
  stagingData = req.body;
  res.status(200).send(
    JSON.stringify({
      success: true,
      blogToStage: stagingData
    })
  );
});

app.post('/post/publish', (req, res) => {
  if (stagingData === null) {
    return res.status(400).send(
      JSON.stringify({
        reason: 'no file in staging'
      })
    );
  }
  const newBlogPost = new mongoSchema.Blog(stagingData);
  return newBlogPost
    .save()
    .then(item => {
      res.status(200).send(
        JSON.stringify({
          success: true,
          blogPost: item
        })
      );
      stagingData = null;
    })
    .catch(err => {
      res.status(400).send(
        JSON.stringify({
          error: err,
          reason: 'unable to save'
        })
      );
    });
});

app.get('/post/all', (req, res) => {
  mongoSchema.Blog.find({}, (error, blogs) => {
    res.send(blogs.slice(0, 5));
  });
});


app.get('/admin', (req, res) => {
  console.log('hello')
});

module.exports = app;
