-- Mock data for 'salties' table
INSERT INTO salties (id, role) VALUES
('saltie1', 'admin'),
('saltie2', 'student'),
('saltie3', 'teacher'),
('saltie4', 'student'),
('saltie5', 'student');


-- Mock data for 'classes' table
INSERT INTO classes (id, name) VALUES
(1, 'Math 101'),
(2, 'Science 101'),
(3, 'History 101');
-- Mock data for 'students' table
INSERT INTO students (id, saltie_id, class_id, name, github) VALUES
(1, 'saltie2', '1', 'John Doe', 'https://github.com/johndoe'),
(2, 'saltie4', '1', 'Jane Smith', 'https://github.com/janesmith'),
(3, 'saltie5', '2', 'Jim Beam', 'https://github.com/jimbeam');

-- Mock data for 'course_modules' table
INSERT INTO course_modules (id, class_id, title, intro) VALUES
(1, 1, 'Introduction to Algebra', 'Basics of Algebra covering equations and inequalities.'),
(2, 1, 'Advanced Algebra', 'Complex equations and algebraic structures.'),
(3, 2, 'Introduction to Biology', 'Introduction to cell biology and genetics.'),
(4, 2, 'Advanced Biology', 'In-depth study of genetics and molecular biology.'),
(5, 3, 'Introduction to World History', 'Overview of key events in world history.');

-- Mock data for 'links' table
INSERT INTO links (id, course_modules_id, url, title, description) VALUES
(1, 1, 'https://algebra.com', 'Algebra Basics', 'Learn the basics of algebra.'),
(2, 2, 'https://advancedalgebra.com', 'Advanced Algebra', 'Explore advanced algebraic concepts.'),
(3, 3, 'https://biology.com', 'Cell Biology', 'Introduction to cell biology.'),
(4, 4, 'https://advancedbiology.com', 'Genetics', 'Detailed study of genetics.'),
(5, 5, 'https://history.com', 'World History Overview', 'Key events in world history.');

-- Mock data for 'utlinks' table
INSERT INTO utlinks (id, course_modules_id, url, title, description) VALUES
(1, 1, 'https://extra-algebra.com', 'Extra Algebra Resources', 'Additional resources for learning algebra.'),
(2, 2, 'https://algebra-problems.com', 'Algebra Problem Sets', 'Practice problems for advanced algebra.'),
(3, 3, 'https://biology-resources.com', 'Biology Resources', 'Extra resources for cell biology.'),
(4, 4, 'https://genetics.com', 'Genetics Resources', 'In-depth genetics resources.'),
(5, 5, 'https://history-resources.com', 'World History Resources', 'Additional materials for world history.');
