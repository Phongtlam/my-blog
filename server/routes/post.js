const express = require('express');
const mongoSchema = require('../../database');

const router = express.Router();

let stagingData = null;

router.post('/stage', (req, res) => {
  if (req.body.cancel) {
    if (stagingData === null) {
      res.status(200).send({
        success: true,
        message: 'There is nothing in staging'
      });
    } else {
      stagingData = null;
      res.status(200).send({
        success: true,
        message: 'Staging data has been deleted'
      });
    }
  } else {
    stagingData = req.body;
    res.status(200).send(
      JSON.stringify({
        success: true,
        message: 'Staging data is ready for publish'
      })
    );
  }
});

router.post('/publish', (req, res) => {
  if (stagingData === null) {
    return res.status(400).send(
      JSON.stringify({
        error: true,
        message: 'No file in staging'
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
          blogPost: item,
          message: 'Successfully publish your new blog post!'
        })
      );
      stagingData = null;
    })
    .catch(err => {
      res.status(400).send(
        JSON.stringify({
          error: err,
          message: 'Unable to save'
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
