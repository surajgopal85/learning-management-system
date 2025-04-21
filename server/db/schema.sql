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
  subject_id INTEGER,
  FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
  FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

CREATE TABLE subjects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL, -- no 2+ courses w same name
  subject_id INTEGER NOT NULL, -- all courses exist within a subject
  UNIQUE(name, subject_id), -- technically could have same name, diff subject area
  FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

-- many to many === make a join table for ids
CREATE TABLE course_teachers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  course_id INTEGER NOT NULL,
  teacher_id INTEGER NOT NULL,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE
);

CREATE TABLE students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dateOfBirth DATE NOT NULL, -- https://www.dofactory.com/sql/date
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  grade INTEGER NOT NULL,
  credits INTEGER DEFAULT 0 -- accumulate credits when passing courses. FE logic?
);

-- many to many === create join table on ids
CREATE TABLE course_students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  course_id INTEGER NOT NULL,
  student_id INTEGER NOT NULL,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE assignment_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  course_id INTEGER NOT NULL,
  name TEXT NOT NULL, -- e.g. Homework, Exams
  weight INTEGER NOT NULL, -- e.g. 40 (%)
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  course_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  creationDate DATE NOT NULL,
  dueDate DATE NOT NULL,
  name TEXT NOT NULL,
  totalPoints INTEGER NOT NULL,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES assignment_categories(id) ON DELETE CASCADE
);

CREATE TABLE grades (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  assignment_id INTEGER NOT NULL,
  pointsEarned INTEGER NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE
);

