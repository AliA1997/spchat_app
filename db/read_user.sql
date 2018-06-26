-- SELECT username, age, spchat_users.id, email, favorite_teams, favorite_players, image,  
--  concat('twitter ', twitter, ' facebook ', facebook, ' instagram ', twitter, 
-- ' snapchat ', snapchat, ' reddit ', reddit, ' twitchtv ', twitchtv, 
-- ' playstation ', playstation, ' xbox ', xbox) social_media FROM spchat_users 
-- JOIN sp_social_media ON spchat_users.id = sp_social_media.user_id WHERE spchat_users.id = $1;
SELECT * FROM spchat_users;