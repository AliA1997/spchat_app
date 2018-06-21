CREATE TABLE spchat_users (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(50) UNIQUE,
    email VARCHAR(50) UNIQUE,
    image VARCHAR(120),
    age VARCHAR(5),
    date_registered VARCHAR(50),
    favorite_teams JSONB[],
    favorite_players JSONB)[],
    favorite_sport VARCHAR(25)
    verified BOOLEAN,
    verification_link VARCHAR(50),
    chat_id INTEGER REFERENCES sp_chats(id),
    survey_id INTEGER REFERENCES sp_surveys(id),
    survey_answer VARCHAR(60)[] REFERENCES sp_surveys(answers)
    isAdmin BOOLEAN
);
-- HOW TO ALTER A TABLE TO JSON OR JSONB
-- ALTER TABLE spchat_users ALTER COLUMN favorite_teams TYPE JSONB[] USING favorite_players::JSONB[];
--- USE ::JSON OR ::JSONB CONVERTER


CREATE TABLE sp_posts (
    id SERIAL PRIMARY KEY,    
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(60) UNIQUE,
    description VARCHAR(200),
    image VARCHAR(200),
    date VARCHAR(100),
    tags VARCHAR(50)[],
    free_throw INTEGER,
    two_pointers INTEGER,
    three_pointers INTEGER,
    total_points INTEGER,
    sport VARCHAR(25),
    chat_id INTEGER REFERENCES sp_chats(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE sp_comments (
    id SERIAL PRIMARY KEY,    
    post_id INTEGER REFERENCES sp_posts(id) ON DELETE CASCADE ON UPDATE CASCADE,
    username VARCHAR(60) REFERENCES spchat_users(username) ON UPDATE CASCADE ON DELETE CASCADE,
    text VARCHAR(200),
    date VARCHAR(60)
);

CREATE TABLE sp_chats (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES sp_posts(id),
    messages VARCHAR(50)[]
);

CREATE TABLE sp_surveys (
 id SERIAL PRIMARY KEY,
 topic VARCHAR(25),
 question VARCHAR(50),
 answers VARCHAR(50)[] UNIQUE
);

--social media table 
CREATE TABLE sp_social_media (
    id SERIAL PRIMARY KEY,
    twitter TEXT DEFAULT NULL,
    facebook TEXT DEFAULT NULL,
    instagram TEXT DEFAULT NULL,
    snapchat TEXT DEFAULT NULL,
    reddit TEXT DEFAULT NULL,
    twitchtv TEXT DEFAULT NULL,
    playstation TEXT DEFAULT NULL,
    xbox TEXT DEFAULT NULL,
    user_id INTEGER REFERENCES spchat_users(id)
);

----For storing the session

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
-- WITH (OIDS=FALSE);
-- ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
