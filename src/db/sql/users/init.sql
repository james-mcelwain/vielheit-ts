INSERT INTO ${schema~}.Users(username,  password, email, fname, lname) VALUES
('test', 'TODO: HASH', 'test@example.com', 'test', 'test') -- test user;
RETURNING id