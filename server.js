const express = require('express');
const bodyparser = require('body-parser');

const PORT = process.env.PORT || 8080;
const server = express();


server.get('/', (req, res) => {
  res.send('wiggity woo');
});

server.get('*', (req, res) => {
  res.send('catch all bad URLs');
});

server.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});