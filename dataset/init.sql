CREATE SCHEMA products;

CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(128) NOT NULL,
  site VARCHAR(8) NOT NULL,
  price DECIMAL(10, 2),
  start_time TIMESTAMP,
  name VARCHAR(64),
  description TEXT,
  nickname VARCHAR(128),
  CONSTRAINT pk_id_site PRIMARY KEY (id, site)
);

INSERT INTO products (id, site, price, start_time, name, description, nickname) VALUES
  ('1', 'meli', 100.00, '2020-01-01 00:00:00', 'Product 1', 'Description 1', 'Nickname 1'),
  ('2', 'meli', 200.00, '2020-01-01 00:00:00', 'Product 2', 'Description 2', 'Nickname 2'),
  ('3', 'meli', 300.00, '2020-01-01 00:00:00', 'Product 3', 'Description 3', 'Nickname 3');