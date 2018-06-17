SELECT username, email, image, favorite_players, favorite_teams, favorite_sport, verified, verification_link
FROM spchat_users WHERE verification_link = $1;
