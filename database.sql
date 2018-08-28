DROP DATABASE IF EXISTS consume_more_stuff;

DROP USER IF EXISTS consume_more_stuff_user;

CREATE USER consume_more_stuff_user WITH PASSWORD 'password';

CREATE DATABASE consume_more_stuff WITH OWNER 'consume_more_stuff_user';