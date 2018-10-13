const express = require('express');
const mongoSchema = require('../../database');

const router = express.Router();

let stagingData = null;

router.post('/stage', (req, res) => {
  stagingData = req.body;
  res.status(200).send(
    JSON.stringify({
      success: true,
      blogToStage: stagingData
    })
  );
});

router.post('/publish', (req, res) => {
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

router.get('/allposts', (req, res) => {
  mongoSchema.Blog.find({}, (error, blogs) => {
    res.send(blogs.slice(0, 5));
  });
});

module.exports = router;
