UPDATE ${schema~}.Users
SET deleted = TRUE
WHERE id = $1