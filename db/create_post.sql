INSERT INTO sp_posts (user_id, title, description, image, date, tags, free_throw, two_pointers, three_pointers, total_points, sport) 
VALUES (${user_id}, ${title}, ${description}, ${imageurl}, ${date}, ${tags}, 0, 0, 0, 0, ${sport});
-- SELECT * FROM sp_posts WHERE user_id = ${user_id} AND 