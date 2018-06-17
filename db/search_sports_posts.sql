SELECT * FROM sp_posts WHERE LOWER(title) LIKE $1 OR LOWER(description) LIKE $1;
