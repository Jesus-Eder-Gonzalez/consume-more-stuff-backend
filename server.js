const express = require('express');
const bodyparser = require('body-parser');

const PORT = process.env.PORT || 8080;
const server = express();
const routes = require('./routes');

server.use(bodyparser.json());

server.use('/api', routes);


server.get('/', (req, res) => {
  res.send('wiggity woo');
});

server.get('*', (req, res) => {
  res.send('catch all bad URLs');
});

server.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
