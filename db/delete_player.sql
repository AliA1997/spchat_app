UPDATE spchat_users
SET favorite_players = array_remove(favorite_players, ${playerToRemove}::jsonb)
WHERE id = ${id};