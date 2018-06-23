SELECT * FROM spchat_users WHERE (LOWER(username) LIKE $1 OR LOWER(email) LIKE $1 
OR username LIKE $1 OR email LIKE $1 OR UPPER(username) LIKE $1 OR UPPER(email) LIKE $1) AND id != 93;
