SELECT sp_posts.*, spchat_users.username, spchat_users.image user_image
FROM sp_posts JOIN spchat_users ON sp_posts.user_id = spchat_users.id ORDER BY RANDOM() LIMIT 5;