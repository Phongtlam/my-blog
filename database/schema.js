const mongoose = require('mongoose');
const urls = require('../src/urls');

const db = mongoose.connection;

// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('Successfully connected to MongoDB.');
});

mongoose.Promise = global.Promise;
mongoose.connect(
  urls.database,
  { useNewUrlParser: true }
);

const blogSchema = new mongoose.Schema({
  date: String,
  title: String,
  coverImgUrl: String,
  markdownTexts: String
});

const portfolioSchema = new mongoose.Schema({
  date: String,
  order: Number,
  title: String,
  coverImgUrl: String,
  markdownTexts: String
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  date: String
});

module.exports.Blog = mongoose.model('Blog', blogSchema);
module.exports.Portfolio = mongoose.model('Portfolio', portfolioSchema);
module.exports.Admin = mongoose.model('Admin', adminSchema);
