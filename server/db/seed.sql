-- seed.sql
INSERT INTO teachers (firstName, lastName, email) VALUES ('Thomas', 'Sowell', 'tsowell@hooverinstitute.org'), ('David', 'Foster-Wallace', 'hal@enfieldtennis.com');

INSERT INTO subjects (name) VALUES ('English'), ('Social Studies'),('Math'),('Science'); 

INSERT INTO teacher_subjects (teacher_id, subject_id) VALUES (1, 2), (1, 4), (2, 1), (2, 3);

INSERT INTO students (dateOfBirth, firstName, lastName, email, grade) 
VALUES 
('6-1-2012', 'Elliott', 'Hunker', 'eshunker@yahoo.com', 9), 
('3-15-2012', 'Jake', 'Perron', 'jperron@vice.com', 9),
('9-11-2012', 'Rob', 'Lindon', 'rob@yipitdata.com', 9),
('11-5-2012', 'Caitlin', 'Lund', 'whitetiger@techfleet.org', 9);

INSERT INTO courses (name, subject_id) VALUES ('English 9', 1), ('Global History', 2), ('Algebra', 3), ('Biology', 4);

INSERT INTO course_teachers (course_id, teacher_id) VALUES (1, 2), (2, 1), (3, 2), (4, 1);

INSERT INTO course_students (course_id, student_id) 
VALUES 
(1, 1), (1, 2), (1, 3), (1, 4),
(2, 1), (2, 2), (2, 3), (2, 4),
(3, 1), (3, 2), (3, 3), (3, 4),
(4, 1), (4, 2), (4, 3), (4, 4);

INSERT INTO assignment_categories (course_id, name, weight) 
VALUES 
(1, 'Homework', 35), (1, 'Essays', 25), (1, 'Quizzes', 10), (1, 'Exams', 30),
(2, 'Homework', 35), (2, 'Essays', 25), (2, 'Quizzes', 10), (2, 'Exams', 30),
(3, 'Homework', 25), (3, 'Classwork', 20), (3, 'Quizzes', 15), (3, 'Exams', 40),
(4, 'Homework', 20), (4, 'Labs', 20), (4, 'Classwork', 15), (4, 'Exams', 45);

INSERT INTO assignments 
(course_id, category_id, creationDate, dueDate, name, totalPoints) 
VALUES 
(1, 1, '6-1-2025', '6-7-2025', 'Hwk 1', 20), (1, 4, '6-4-2025', '6-5-2025', 'Exam 1', 50),
(2, 1, '6-1-2025', '6-7-2025', 'Hwk 1', 20), (2, 4, '6-4-2025', '6-5-2025', 'Exam 1', 50),
(3, 1, '6-1-2025', '6-7-2025', 'Hwk 1', 20), (3, 4, '6-4-2025', '6-5-2025', 'Exam 1', 50),
(4, 1, '6-1-2025', '6-7-2025', 'Hwk 1', 20), (4, 4, '6-4-2025', '6-5-2025', 'Exam 1', 50);

-- Link students to assignments (initialize grades)
INSERT INTO grades (student_id, assignment_id, pointsEarned) VALUES
(1, 1, 17), (2, 1, 18), (3, 1, 15), (4, 1, 20),
(1, 2, 38), (2, 2, 42), (3, 2, 46), (4, 2, 49),
(1, 3, 17), (2, 3, 18), (3, 3, 15), (4, 3, 20),
(1, 4, 38), (2, 4, 42), (3, 4, 46), (4, 4, 49),
(1, 5, 17), (2, 5, 18), (3, 5, 15), (4, 5, 20),
(1, 6, 38), (2, 6, 42), (3, 6, 46), (4, 6, 49),
(1, 7, 17), (2, 7, 18), (3, 7, 15), (4, 7, 20),
(1, 8, 38), (2, 8, 42), (3, 8, 46), (4, 8, 49);
