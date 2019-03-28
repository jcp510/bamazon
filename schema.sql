DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT(4) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30),
  department_name VARCHAR(30),
  price DECIMAL(10, 2),
  stock_quantity INT,
  PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES
  (1000, "light saber", "weapons", 1000.00, 100),
  (1001, "cape", "clothing", 100.00, 100),
  (1002, "storm trooper helmet", "armor", 30.00, 100),
  (1003, "hooded robe", "clothing", 50.00, 100),
  (1004, "hologram projector", "devices", 200.00, 100),
  (1005, "astromech droid", "droids", 500.00, 100),
  (1006, "wookie crossbow", "weapons", 300.00, 100),
  (1007, "comlink", "devices", 100.00, 100),
  (1008, "z-6 jetpack", "armor", 300.00, 100),
  (1009, "protocol droid", "droids", 500.00, 100);