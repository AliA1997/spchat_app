UPDATE sp_posts 
SET bronze = bronze + 1
WHERE id = ${post_id};
UPDATE sp_posts 
SET total_points = total_points + ${points}
WHERE id = ${post_id};