UPDATE sp_social_media 
SET reddit = $1
WHERE user_id = $2;