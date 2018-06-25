UPDATE spchat_users
SET favorite_players = array_append(favorite_players, ${newPlayer}::jsonb)
WHERE id = ${id};