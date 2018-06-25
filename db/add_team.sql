UPDATE spchat_users
SET favorite_teams = array_append(favorite_teams, ${newTeam}::jsonb)
WHERE id = ${id};