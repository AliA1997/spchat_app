UPDATE spchat_users
SET username = ${username},
    email = ${email},
    image = ${image},
    date_registered = ${date},
    favorite_teams = ${favoriteTeams}::jsonb[], 
    favorite_players = ${favoritePlayers}::jsonb[], 
    favorite_sport = ${favoriteSport}
    WHERE id = ${id};
SELECT * FROM spchat_users WHERE id = ${id};