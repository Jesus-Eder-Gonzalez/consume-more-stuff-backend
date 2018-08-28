const express = require('express');
const bodyparser = require('body-parser');
const session = require ('express-session');
const Redis = require('connect-redis');
const passport = require('passport');

const PORT = process.env.PORT || 8080;
const server = express();
const routes = require('./routes');

server.use(bodyparser.json());

// server.use(session({
//   store: new Redis(),
//   secret: 'fuzzy rabbits',
//   resav: false,
//   saveUninitialized: true
// }));

// server.use(passport.initiatlize());
// server.use(passport.session());

// server.use('/api', routes);

// server.get('*', (req, res) => {
//   res.send('catch all bad URLs');
// });

server.listen(PORT, () => {
  console.log(`Connected to port ${PORT}\n`);
});
