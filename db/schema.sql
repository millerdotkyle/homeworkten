DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
  id INT NOT NULL,
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL,
  title VARCHAR(30) NOT NULL,
  department_id INT,
  salary DECIMAL,
  FOREIGN KEY (department_id)
  REFERENCES departments(id),
  PRIMARY KEY (id)
);

CREATE TABLE employees (
  id INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES roles(id),
  PRIMARY KEY (id)
);

-- CREATE TABLE customers (
--   id INT NOT NULL,
--   first_name VARCHAR(30),
--   last_name VARCHAR(30),
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE customer_order (
--   id INT,
--   customer_id INT,
--   order_details TEXT,
--   FOREIGN KEY (customer_id)
--   REFERENCES customers(id)
--   ON DELETE SET NULL
-- );
