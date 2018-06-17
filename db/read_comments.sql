SELECT sp_comments.*, spchat_users.image user_image
 FROM sp_comments JOIN spchat_users ON sp_comments.username = spchat_users.username 
 WHERE post_id = $1 LIMIT 20;
