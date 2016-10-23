CREATE TABLE IF NOT EXISTS ${schema~}.Posts
(
    id          SERIAL      PRIMARY KEY
,   user_id     INT         REFERENCES Users(ID)
,   title       CHAR(100)   NOT NULL
,   body        TEXT        NOT NULL
,   created     DATE        NOT NULL        DEFAULT current_timestamp
,   updated     DATE
    deleted     BOOLEAN     NOT NULL        DEFAULT false
);