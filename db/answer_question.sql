UPDATE spchat_users
SET questions = array_append(questions, ${question}::JSONB)
WHERE id = ${id};