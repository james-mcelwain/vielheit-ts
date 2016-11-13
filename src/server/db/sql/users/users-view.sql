CREATE OR REPLACE VIEW ${schema~}.Users_View AS
SELECT username, email, id, fname, lname, created, updated
FROM Users