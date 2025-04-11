CREATE TABLE thing(
  name TEXT
);

CREATE TABLE teachers(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL -- important that no 2 users have same email
);

-- separate subjects
CREATE TABLE teacher_subjects(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  teacher_id INTEGER,
  subject TEXT NOT NULL,
  FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE
);

CREATE TABLE subjects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);
