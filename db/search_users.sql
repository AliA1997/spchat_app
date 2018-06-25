SELECT spchat_users.*, sp_social_media.*, sp_posts.* FROM spchat_users JOIN sp_social_media
ON spchat_users.id = sp_social_media.user_id JOIN sp_posts ON spchat_users.id = sp_posts.user_id 
WHERE (LOWER(username) LIKE $1 OR LOWER(email) LIKE $1 OR username LIKE $1 OR email LIKE $1 OR UPPER(username) 
LIKE $1 OR UPPER(email) LIKE $1) AND spchat_users.id != 93;
