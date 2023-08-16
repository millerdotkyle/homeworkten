DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(40) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(40) NOT NULL UNIQUE,
  department_id INT,
  salary DECIMAL(9, 2),
  FOREIGN KEY (department_id)
  REFERENCES departments(id),
  PRIMARY KEY (id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES roles(id),
  PRIMARY KEY (id)
);
