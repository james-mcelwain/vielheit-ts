INSERT INTO ${schema~}.Users(username,  password, email, fname, lname) VALUES
('jmcelwain', '$2a$10$l.KZcS2j15AAC697skFituXDjLosVN4e6NR2p0ZULRl.2HaUuUH8C', 'jmcelwain@gmail.com', 'james', 'mcelwain') -- test user;
RETURNING id