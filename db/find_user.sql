SELECT spchat_users.*, 
concat('twitter ', sp_social_media.twitter, ' facebook ', sp_social_media.facebook, ' instagram ', sp_social_media.instagram, 
' snapchat ', sp_social_media.snapchat, ' reddit ', sp_social_media.reddit, ' twitchtv ', sp_social_media.twitchtv, 
' playstation ', sp_social_media.playstation, ' xbox ', sp_social_media.xbox) AS social_media
 FROM spchat_users JOIN sp_social_media ON spchat_users.id = sp_social_media.user_id WHERE username = $1;