const mongoose = require('mongoose');
const urls = require('../src/urls');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', callback => {
  // The code in this asynchronous callback block is executed after connecting to MongoDB.
  console.log('Successfully connected to MongoDB.');
});

mongoose.Promise = global.Promise;
mongoose.connect(
  urls.database,
  { useNewUrlParser: true }
);

const blogSchema = new mongoose.Schema({
  date: String,
  markdownTexts: String
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
