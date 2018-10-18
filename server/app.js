const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');

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
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use('/post', routes.post);

app.use('/portfolio', routes.portfolio);

app.use('/login', routes.login);

module.exports = app;
