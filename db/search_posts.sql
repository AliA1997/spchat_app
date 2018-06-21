SELECT * FROM sp_posts WHERE LOWER(title) LIKE $1 OR LOWER(description) LIKE $1
OR title = $1 OR description = $1 OR UPPER(title) LIKE $1 OR UPPER(description) LIKE $1;
-- OR title LIKE $2 OR description LIKE $2 OR title LIKE $3 OR description LIKE $3
-- OR title LIKE $4 OR description LIKE $4; 