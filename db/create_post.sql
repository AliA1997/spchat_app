INSERT INTO sp_posts (user_id, title, description, image, date, tags, bronze, silver, gold, total_points, sport) 
VALUES (${user_id}, ${title}, ${description}, ${imageurl}, ${date}, ${tags}, 0, 0, 0, 0, ${sport}) RETURNING *;
-- SELECT * FROM sp_posts WHERE user_id = ${user_id} AND 