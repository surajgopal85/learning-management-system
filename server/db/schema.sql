CREATE TABLE thing(
  name TEXT
);

CREATE TABLE teachers(
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);

-- separate subjects
CREATE TABLE teacher_subjects(
  id SERIAL PRIMARY KEY,
  teacher_id INT REFERENCES teachers(id) ON DELETE CASCADE,
  subject VARCHAR(255) NOT NULL
);

CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);
