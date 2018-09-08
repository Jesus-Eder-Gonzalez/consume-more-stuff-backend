require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const Redis = require('connect-redis')(session);
const passport = require('passport');

const PORT = process.env.PORT || 8080;
const server = express();
const routes = require('./routes');

// server.use(express.static('public/'))
server.use(bodyparser.json());
server.use(bodyparser.urlencoded({ extended: true }));

server.use(
  session({
    store: new Redis(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

server.use(passport.initialize());
server.use(passport.session());

server.use('/api', routes);

server.get('*', (req, res) => {
  res.sendFile('index.html');
});

server.listen(PORT, () => {
  console.log(`Connected to port ${PORT}\n`);
});
