UPDATE spchat_users
SET questions = array_remove(questions, ${question}::JSONB)
WHERE id = ${id};