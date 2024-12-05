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

INSERT INTO Users (firstName, lastName, email, password, level, xp, created_at) 
VALUES 
('John', 'Doe', 'johndoe@example.com', 'hashedpassword1', 0, 0, CURRENT_TIMESTAMP),
('Jane', 'Smith', 'janesmith@example.com', 'hashedpassword2', 0, 0, CURRENT_TIMESTAMP),
('Alice', 'Johnson', 'alicejohnson@example.com', 'hashedpassword3', 0, 0, CURRENT_TIMESTAMP),
('Bob', 'Brown', 'bobbrown@example.com', 'hashedpassword4', 0, 0, CURRENT_TIMESTAMP),
('Charlie', 'Davis', 'charliedavis@example.com', 'hashedpassword5', 0, 0, CURRENT_TIMESTAMP);

SHOW GRANTS FOR 'sedla'@'localhost';

GRANT ALL PRIVILEGES ON heble.* TO 'sedla'@'localhost' IDENTIFIED BY '20052006';
FLUSH PRIVILEGES;
