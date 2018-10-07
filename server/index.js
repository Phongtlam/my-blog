const http = require('http');
const app = require('./app');

const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`my-blog listening on port ${PORT}!`);
});
