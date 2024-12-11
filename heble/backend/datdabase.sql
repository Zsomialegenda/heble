CREATE DATABASE IF NOT EXISTS HeBLE;

USE HeBLE;

CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100),
  lastName VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),

  level INT DEFAULT 1,
  xp INT DEFAULT 0,

  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Exercises (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL, 
  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,

  pushUps INT DEFAULT 0,
  pullUps INT DEFAULT 0,
  squats INT DEFAULT 0,
  running INT DEFAULT 0,

  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Achievements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  points INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS UserAchievements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  achievement_id INT NOT NULL,
  earnedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (achievement_id) REFERENCES Achievements(id) ON DELETE CASCADE,
  UNIQUE(user_id, achievement_id)
);

INSERT INTO Users (firstName, lastName, email, password, level, xp, createdAt) 
VALUES 
('Bence', 'Kovács', 'kovacsbence@example.com', 'hashedpassword6', 1, 100, CURRENT_TIMESTAMP),
('Réka', 'Nagy', 'nagyreka@example.com', 'hashedpassword7', 2, 200, CURRENT_TIMESTAMP),
('László', 'Tóth', 'tothlaszlo@example.com', 'hashedpassword8', 3, 300, CURRENT_TIMESTAMP),
('Anna', 'Szabó', 'szaboanna@example.com', 'hashedpassword9', 4, 400, CURRENT_TIMESTAMP),
('István', 'Kiss', 'kissistvan@example.com', 'hashedpassword10', 5, 500, CURRENT_TIMESTAMP);

INSERT INTO Exercises (user_id, pushUps, pullUps, squats, running, createdAt)
VALUES 
(1, 30, 10, 50, 2, CURRENT_TIMESTAMP),
(2, 20, 15, 40, 3, CURRENT_TIMESTAMP),
(3, 25, 12, 60, 5, CURRENT_TIMESTAMP),
(4, 35, 18, 70, 6, CURRENT_TIMESTAMP),
(5, 40, 20, 80, 7, CURRENT_TIMESTAMP);

INSERT INTO Achievements (name, description, points, createdAt)
VALUES 
('Első lépés', 'Teljesítsd az első 10 fekvőtámaszt!', 10, CURRENT_TIMESTAMP),
('Kitartó', 'Fuss 5 kilométert egy nap alatt!', 20, CURRENT_TIMESTAMP),
('Izomember', 'Csinálj 100 guggolást egy edzés alatt!', 30, CURRENT_TIMESTAMP),
('Mester', 'Húzz fel 20-szor egy nap alatt!', 40, CURRENT_TIMESTAMP),
('Szuperatléta', 'Érj el összesen 1000 XP-t!', 50, CURRENT_TIMESTAMP);

INSERT INTO UserAchievements (user_id, achievement_id, earnedAt)
VALUES 
(1, 1, CURRENT_TIMESTAMP),
(2, 2, CURRENT_TIMESTAMP),
(3, 3, CURRENT_TIMESTAMP),
(4, 4, CURRENT_TIMESTAMP),
(5, 5, CURRENT_TIMESTAMP);


SHOW GRANTS FOR 'sedla'@'localhost';
SHOW GRANTS FOR 'Sedlák Ákos'@'localhost';

GRANT ALL PRIVILEGES ON heble.* TO 'sedla'@'localhost' IDENTIFIED BY '20052006';
FLUSH PRIVILEGES;


GRANT ALL PRIVILEGES ON heble.* TO 'Sedlák Ákos'@'localhost' IDENTIFIED BY '20052006';
FLUSH PRIVILEGES;
