# consume-more-stuff-backend

> This is the backend for consume-more-stuff.

## Installation
> using npm, install the following
  - bcrypt
  - body-parser
  - bookshelf
  - connect-redis
  - express
  - express-session
  - knex
  - passport
  - passport-local
  - pg

## Database

The backend also requires **PostgreSQL** for the database server.

To create the database, open up PSQL at the root of the folder and type the following:
>\i database.sql

After the database is created, exit out of PSQL and migrate the tables in, then seed the data:
>$ node_modules/.bin/knex migrate:latest
>$ node_modules/.bin/knex seed:run