INSERT INTO spchat_users (username, email, password, image, age, date_registered, favorite_teams, favorite_players, favorite_sport, verified, verification_link, posts, questions) 
VALUES 
(${username}, ${email}, ${password}, ${image}, ${age}, ${date}, ${favoriteTeams}::jsonb[], ${favoritePlayers}::jsonb[], ${favoriteSport}, false, ${verification_link}, ARRAY[]::JSONB[], ARRAY[]::JSONB[]);
INSERT INTO sp_social_media (user_id) SELECT id FROM spchat_users WHERE email = ${email};
SELECT username, email, image, age, favorite_teams, favorite_players, favorite_sport, spchat_users.posts,  sp_social_media.*
 FROM spchat_users JOIN sp_social_media ON spchat_users.id = sp_social_media.user_id WHERE username = ${username};