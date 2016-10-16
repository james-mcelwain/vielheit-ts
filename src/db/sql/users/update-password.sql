UPDATE ${schem~}.Users
SET password = $1
WHEERE id = $2
RETURNING id;