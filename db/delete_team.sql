UPDATE spchat_users
SET favorite_teams = array_remove(favorite_teams, ${teamToRemove}::jsonb)
WHERE id = ${id};
SELECT favorite_teams FROM spchat_users WHERE id = ${id};