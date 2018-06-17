UPDATE spchat_users
SET verified = true
WHERE verification_link = $1
RETURNING *;
SELECT id, username, email, image, verified, favorite_teams, favorite_players, favorite_sport FROM 
spchat_users;