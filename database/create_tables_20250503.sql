-- Table for quiz questions (two choices, no audio stored)
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    choice_a TEXT NOT NULL, -- First word choice
    choice_b TEXT NOT NULL  -- Second word choice
);

-- Table for storing each play session result
CREATE TABLE results (
    id SERIAL PRIMARY KEY,
    played_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the quiz was played
    score INTEGER,                                          -- Final score (to be calculated by app logic)
    correct_count INTEGER,                                  -- Number of correct answers
    question_count INTEGER                                  -- Total number of questions in this session
);

-- Table for storing answers to each question during a play session
CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    result_id INTEGER NOT NULL REFERENCES results(id) ON DELETE CASCADE,     -- Link to play session result
    question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE, -- Link to the question answered
    selected_answer TEXT NOT NULL,                                           -- The word chosen by the user (either choice_a or choice_b)
    is_correct BOOLEAN NOT NULL,                                             -- Whether the selected answer was correct
    answered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP                 -- Timestamp when the answer was submitted
);