const express = require('express');
const bodyparser = require('body-parser');

const PORT = process.env.PORT || 8080;
const Category = require('./db/models/Category');
const server = express();

server.use(bodyparser.json());

server.get('/api/categories/items', (req, res) => {
  return Category.fetchAll({withRelated: ['items']})
    .then(response => {
      console.log(response);
      res.json(response);
    })
    .catch(err => {
      console.log(err);
    });
});

server.get('/', (req, res) => {
  res.send('wiggity woo');
});

server.get('*', (req, res) => {
  res.send('catch all bad URLs');
});

server.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
