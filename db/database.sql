-- CREATE DATABASE IF NOT EXISTS companydb;

-- USE companydb;

CREATE TABLE producto (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) DEFAULT NULL,
  precio INT(11) DEFAULT NULL, 
  PRIMARY KEY(id)
);

DESCRIBE producto;

INSERT INTO producto values 
  (1, 'Teclado', 59),
  (2, 'Ratón', 49),
  (3, 'Monitor', 159);

SELECT * FROM producto;
