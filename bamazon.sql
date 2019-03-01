#DROP DATABASE IF EXISTS bamazon_DB;
#CREATE DATABASE bamazon_db;

USE bamazon_db;
CREATE TABLE products(
 item_id INT(10) NOT NULL auto_increment,
 product_name VARCHAR(100) NOT NULL,
 department_name VARCHAR(45) NOT NULL,
 price INT default 0,
 stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);