UPDATE sp_chats;
SET messages = ${messages}::jsonb[],
users = ${users}::jsonb[]
WHERE post_id = ${post_id};
SELECT * FROM sp_chats WHERE post_id = ${post_id};