INSERT INTO sp_chats (post_id, messages, users) VALUES (${post_id}, ${messages}::jsonb[], ${users}::jsonb[]);
-- INSERT INTO sp_chats (post_id, messages) VALUES (${post_id}, ${messages}::jsonb[]);