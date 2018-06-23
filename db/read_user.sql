SELECT username, favorite_players, favorite_teams, image  FROM spchat_users 
JOIN sp_social_media ON spchat_users.id = sp_social_media.user_id;