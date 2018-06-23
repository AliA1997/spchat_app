UPDATE sp_social_media 
SET twitter = $1
WHERE user_id = $2;