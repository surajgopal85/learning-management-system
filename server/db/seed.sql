-- seed.sql
INSERT INTO teachers (name) VALUES ('Thomas Sowell', ), ('Caitlin Gopal');

INSERT INTO students (name) VALUES ('Charlie'), ('Dana'), ('Eli');

INSERT INTO courses (name, teacher_id) VALUES ('Math 101', 1), ('Science 202', 2);

INSERT INTO assignments (name, course_id, maxPoints) VALUES 
  ('Homework 1', 1, 100),
  ('Quiz 1', 1, 50),
  ('Lab Report', 2, 75);

-- Link students to assignments (initialize grades)
INSERT INTO grades (student_id, assignment_id, pointsEarned) VALUES
  (1, 1, 0), (1, 2, 0),
  (2, 1, 0), (2, 2, 0),
  (3, 1, 0), (3, 2, 0),
  (1, 3, 0), (2, 3, 0), (3, 3, 0);
