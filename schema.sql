CREATE DATABASE dayplanner_db;

USE dayplanner_db;

CREATE TABLE allplans(
  id INT(10) AUTO_INCREMENT NOT NULL,
    plan VARCHAR(100) NOT NULL,
    primary key(id)
);
