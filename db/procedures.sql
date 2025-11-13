USE company;

DELIMITER $$
USE `company`$$

CREATE PROCEDURE `productoAddOrEdit` (
  IN _id INT,
  IN _name VARCHAR(45),
  IN _precio INT
)
BEGIN 
  IF _id = 0 THEN
    INSERT INTO producto (name, precio)
    VALUES (_name, _precio);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE producto
    SET
    name = _name,
    precio = _precio
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END
