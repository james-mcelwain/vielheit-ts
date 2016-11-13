CREATE TABLE IF NOT EXISTS ${schema~}.Users
(
    id serial PRIMARY KEY,
    active BOOLEAN NOT NULL DEFAULT false,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(256),
    email VARCHAR(254) NOT NULL UNIQUE,
    fname VARCHAR(40),
    lname VARCHAR(40),
    created DATE NOT NULL DEFAULT current_timestamp,
    updated DATE,
    deleted BOOLEAN NOT NULL DEFAULT false
);