INSERT INTO ${schema~}.Users(username, password, email, fname, lname)
VALUES(${username}, ${password}, ${email}, ${fname}, ${lname})
RETURNING id;
