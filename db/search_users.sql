SELECT * FROM spchat_users WHERE LOWER(username) LIKE $1 OR LOWER(email) LIKE $1;
