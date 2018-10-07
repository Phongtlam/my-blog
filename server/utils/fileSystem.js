const fs = require('fs');
const path = require('path');

const publishPost = (data, callback) => {
  fs.writeFile(
    path.join(__dirname, '../../public/posts/htmlFile.md'),
    data,
    err => {
      if (err) {
        // eslint-disable-next-line no-console
        callback(null, err);
        throw new Error('error in file read', err);
      }
      fs.readFile(
        path.join(__dirname, '../../public/posts/htmlFile.md'),
        'utf8',
        (errRead, fileRead) => {
          if (errRead) {
            // eslint-disable-next-line no-console
            callback(null, errRead);
            throw new Error('error in file read', errRead);
          }
          callback(fileRead);
        }
      );
    }
  );
};

module.exports = {
  publishPost
};
