UPDATE sp_comments
SET text = ${text},
date = ${date}
WHERE post_id = ${post_id} AND id = ${comment_id};