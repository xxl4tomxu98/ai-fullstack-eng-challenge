USE challenge;

-- CREATE TABLE test(col VARCHAR(10));
-- INSERT INTO test(col) VALUES('ok');

-- CREATE TABLE ratings (
-- userId INT NOT NULL,
-- movieId INT NOT NULL,
-- rating DECIMAL(2,1) NOT NULL,
-- timestamp INT,
-- PRIMARY KEY (userId, movieId)
-- );


-- CREATE TABLE tags (
-- userId INT NOT NULL,
-- movieId INT NOT NULL,
-- tag VARCHAR(255) NOT NULL,
-- timestamp INT,
-- PRIMARY KEY (userId, movieId)
-- );

DROP TABLE IF EXISTS movies; CREATE TABLE movies (
movieId INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255) NOT NULL UNIQUE,
genres VARCHAR(255) NOT NULL
);
-- INSERT INTO movies(title, genres) VALUES('ok', 'romantic');
LOAD DATA LOCAL INFILE  'movies.csv' into table movies
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES (movieId, title, genres);
