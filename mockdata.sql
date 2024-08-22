INSERT INTO users (id, role) VALUES
('user1', 'admin'),
('user2', 'student'),
('user3', 'teacher'),
('user4', 'student'),
('user5', 'teacher'),
('user6', 'student'),
('user7', 'admin'),
('user8', 'student'),
('user9', 'teacher'),
('user10', 'student');

INSERT INTO classes (id, name) VALUES
(1, 'Math 101'),
(2, 'Science 101'),
(3, 'History 101'),
(4, 'Physics 101'),
(5, 'Chemistry 101'),
(6, 'English Literature'),
(7, 'Computer Science 101'),
(8, 'Art History'),
(9, 'Philosophy 101'),
(10, 'Psychology 101');

INSERT INTO students (id, user_id, class_id, name, github) VALUES
(1, 'user2', 1, 'John Doe', 'https://github.com/johndoe'),
(2, 'user2', 2, 'Jane Doe', 'https://github.com/janedoe'),
(3, 'user4', 3, 'Jim Beam', 'https://github.com/jimbeam'),
(4, 'user6', 4, 'Jack Daniels', 'https://github.com/jackdaniels'),
(5, 'user8', 5, 'Johnny Walker', 'https://github.com/johnnywalker'),
(6, 'user10', 6, 'Jameson Irish', 'https://github.com/jamesonirish'),
(7, 'user2', 7, 'George Smith', 'https://github.com/georgesmith'),
(8, 'user4', 8, 'Glen Morangie', 'https://github.com/glenmorangie'),
(9, 'user6', 9, 'Mac Allan', 'https://github.com/macallan'),
(10, 'user8', 10, 'Evan Williams', 'https://github.com/evanwilliams');

INSERT INTO course_modules (id, title, intro) VALUES
(1, 'Introduction to Algebra', 'Basics of Algebra covering equations and inequalities.'),
(2, 'Introduction to Biology', 'Introduction to cell biology and genetics.'),
(3, 'Introduction to World History', 'Overview of key events in world history.'),
(4, 'Introduction to Newtonian Physics', 'Basic concepts in Newtonian Mechanics.'),
(5, 'Introduction to Organic Chemistry', 'Fundamentals of organic molecules and reactions.'),
(6, 'Shakespearean Literature', 'Analysis of key works by William Shakespeare.'),
(7, 'Introduction to Programming', 'Learn the basics of programming in Python.'),
(8, 'Renaissance Art History', 'A study of art and architecture during the Renaissance.'),
(9, 'Introduction to Ethics', 'An overview of major ethical theories and thinkers.'),
(10, 'Introduction to Cognitive Psychology', 'Basics of cognitive processes and how they influence behavior.');

-- Mock data for 'links' table
INSERT INTO links (id, course_modules_id, url, title, description) VALUES
(1, 1, 'https://algebra.com', 'Algebra Basics', 'Learn the basics of algebra.'),
(2, 2, 'https://biology.com', 'Cell Biology', 'Introduction to cell biology.'),
(3, 3, 'https://history.com', 'World History Overview', 'Key events in world history.'),
(4, 4, 'https://physics.com', 'Newtonian Mechanics', 'Learn about Newtonian physics.'),
(5, 5, 'https://organicchemistry.com', 'Organic Chemistry', 'Introduction to organic chemistry.'),
(6, 6, 'https://shakespeare.com', 'Shakespeare', 'Analysis of Shakespeares works.'),
(7, 7, 'https://programming.com', 'Python Programming', 'Learn to program in Python.'),
(8, 8, 'https://renaissance.com', 'Renaissance Art', 'Study of Renaissance art.'),
(9, 9, 'https://ethics.com', 'Ethics Overview', 'Learn about major ethical theories.'),
(10, 10, 'https://cognitivepsychology.com', 'Cognitive Psychology', 'Introduction to cognitive psychology.');

INSERT INTO utlinks (id, course_modules_id, url, title, description) VALUES
(1, 1, 'https://additional-algebra.com', 'Advanced Algebra', 'Advanced topics in algebra.'),
(2, 2, 'https://genetics.com', 'Genetics Basics', 'Introduction to genetics.'),
(3, 3, 'https://modern-history.com', 'Modern History', 'Exploring modern historical events.'),
(4, 4, 'https://thermodynamics.com', 'Thermodynamics Basics', 'Introduction to thermodynamics.'),
(5, 5, 'https://biochemistry.com', 'Biochemistry', 'Basics of biochemistry.'),
(6, 6, 'https://poetry.com', 'Shakespearean Poetry', 'Study of Shakespeares poetry.'),
(7, 7, 'https://advancedprogramming.com', 'Advanced Python', 'Advanced concepts in Python programming.'),
(8, 8, 'https://baroque.com', 'Baroque Art', 'Study of Baroque art.'),
(9, 9, 'https://moralphilosophy.com', 'Moral Philosophy', 'In-depth study of moral philosophy.'),
(10, 10, 'https://neuroscience.com', 'Neuroscience Basics', 'Introduction to the neuroscience of behavior.');
