UPDATE spchat_users
SET favorite_players = array_remove(favorite_players, ${playerToRemove}::jsonb)
WHERE id = ${id};
SELECT favorite_players FROM spchat_users WHERE id = ${id};