CREATE DATABASE IF NOT EXISTS melidb

CREATE USER 'slbenitezd'@'%' IDENTIFIED BY 'b4ckendChallenge';
GRANT CREATE, ALTER, INDEX, LOCK TABLES, REFERENCES, UPDATE, DELETE, DROP, SELECT, INSERT ON `products`.* TO 'slbenitezd'@'%';

FLUSH PRIVILEGES;

USE melidb;

CREATE TABLE IF NOT EXIST products (
  id VARCHAR(128) NOT NULL,
  site VARCHAR(8) NOT NULL,
  price DECIMAL(10, 2) UNSIGNED,
  start_time DATETIME,
  name VARCHAR(64),
  description TEXT,
  nickname VARCHAR(128),
  CONSTRAINT pk_id_site PRIMARY KEY (id, site)
);
