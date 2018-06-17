UPDATE sp_posts 
SET title = ${title},
description = ${description},
image = ${imageurl},
date = ${date},
tags = ${tags}
WHERE id = ${id}
RETURNING *;