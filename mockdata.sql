
-- Inserting mock data into the `users` table
INSERT INTO users (id, role) VALUES
('user1', 'student'),
('user2', 'student'),
('user3', 'student'),
('user4', 'teacher'),
('user5', 'admin');

-- Inserting mock data into the `students` table
INSERT INTO students (userId, name, github) VALUES
('user1', 'Alice Johnson', 'https://github.com/alice'),
('user2', 'Bob Smith', 'https://github.com/bob'),
('user3', 'Charlie Brown', 'https://github.com/charlie');

-- Inserting mock data into the `classes` table
INSERT INTO classes (name) VALUES
('Web Development'),
('Data Science'),
('Mobile App Development');

-- Inserting mock data into the `course_modules` table
INSERT INTO course_modules (title, intro) VALUES
('Introduction to HTML', 'Learn the basics of HTML, the standard language for creating web pages.'),
('CSS Basics', 'This module covers the fundamentals of CSS, including selectors, properties, and the box model.'),
('JavaScript for Beginners', 'An introduction to JavaScript, the programming language of the web.'),
('Introduction to Python', 'Learn Python, a powerful programming language used in data science and machine learning.'),
('Data Visualization with Python', 'Explore data visualization techniques using Python libraries such as Matplotlib and Seaborn.');

-- Inserting mock data into the `links` table
INSERT INTO links (courseModulesId, url, title, description) VALUES
(1, 'https://developer.mozilla.org/en-US/docs/Web/HTML', 'MDN Web Docs: HTML', 'Comprehensive resource for HTML.'),
(1, 'https://www.w3schools.com/html/', 'W3Schools HTML Tutorial', 'Learn HTML from scratch with examples.'),
(2, 'https://developer.mozilla.org/en-US/docs/Web/CSS', 'MDN Web Docs: CSS', 'Comprehensive resource for CSS.'),
(2, 'https://www.css-tricks.com/', 'CSS-Tricks', 'Tips, tricks, and techniques on using CSS.'),
(3, 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', 'MDN Web Docs: JavaScript', 'Comprehensive resource for JavaScript.');

-- Inserting mock data into the `utlinks` table
INSERT INTO utlinks (courseModulesId, url, title, description) VALUES
(4, 'https://docs.python.org/3/tutorial/', 'Official Python Tutorial', 'The official Python tutorial for beginners.'),
(4, 'https://realpython.com/', 'Real Python', 'Learn Python with tutorials, quizzes, and exercises.'),
(5, 'https://matplotlib.org/stable/tutorials/index.html', 'Matplotlib Tutorials', 'Learn data visualization with Matplotlib.'),
(5, 'https://seaborn.pydata.org/tutorial.html', 'Seaborn Tutorial', 'Comprehensive guide to using Seaborn for data visualization.');
