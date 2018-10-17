const express = require('express');
const mongoSchema = require('../../database');

const router = express.Router();

router.post('/', (req, res) => {
  mongoSchema.Admin.findOne(
    {
      username: req.body.username,
      password: req.body.password,
      name: req.query.name,
      date: req.query.date
    },
    (error, adminUser) => {
      if (error || adminUser === null) {
        res.status(400).send({
          authorized: false,
          message: 'You are not authorized to modify this page'
        });
      } else {
        res.status(200).send(
          JSON.stringify({
            username: adminUser.username,
            authorized: true
          })
        );
      }
    }
  );
});

module.exports = router;
