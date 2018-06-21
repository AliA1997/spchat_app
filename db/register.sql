INSERT INTO spchat_users (username, email, password, image, age, date_registered, favorite_teams, favorite_players, favorite_sport, verified, verification_link) 
VALUES 
(${username}, ${email}, ${password}, ${image}, ${age}, ${date}, ${favoriteTeams}::jsonb[], ${favoritePlayers}::jsonb[], ${favoriteSport}, false, ${verification_link});
SELECT username, email, image, age, favorite_teams, favorite_players, favorite_sport FROM spchat_users WHERE username = ${username};