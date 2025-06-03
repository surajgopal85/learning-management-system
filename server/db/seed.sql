-- seed.sql
INSERT INTO teachers (firstName, lastName, email) VALUES ('Thomas', 'Sowell', 'tsowell@hooverinstitute.org'), ('David', 'Foster-Wallace', 'hal@enfieldtennis.com');

INSERT INTO subjects (name) VALUES ('English'), ('Social Studies'),('Math'),('Science'); 

INSERT INTO students (dateOfBirth, firstName, lastName, email, grade) 
VALUES 
('6-1-1985', 'Elliott', 'Hunker', 'eshunker@yahoo.com', 9), 
('3-15-1984', 'Jake', 'Perron', 'jperron@vice.com'),
('9-11-1989', 'Rob', 'Lindon', 'rob@yipitdata.com');

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
