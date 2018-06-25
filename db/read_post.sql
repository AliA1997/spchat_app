SELECT sp_posts.*, spchat_users.username, spchat_users.email, spchat_users.image as user_image FROM sp_posts JOIN spchat_users
ON sp_posts.user_id = spchat_users.id WHERE sp_posts.id = $1;
-- SELECT * FROM sp_posts WHERE id = $1;