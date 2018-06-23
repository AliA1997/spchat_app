UPDATE sp_social_media 
SET facebook = $1
WHERE user_id = $2;