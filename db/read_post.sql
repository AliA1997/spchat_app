SELECT sp_posts.*, spchat_users.username, spchat_users.email FROM sp_posts JOIN spchat_users
ON sp_posts.user_id = spchat_users.id WHERE sp_posts.id = $1;