INSERT INTO departments (id, dept_name)
VALUES
    (1, "Sales"),
    (2, "Engineering"),
    (3, "Finance"),
    (4, "Legal");

INSERT INTO role (id, title, department_id, salary)
    (1, "Sales Lead", 1, 10000),
    (2, "Salesperson", 1, 8000),
    (3, "Lead Engineer", 2, 150000),
    (4, "Software Engineer", 2, 120000),
    (5, "Account Manager", 3, 160000),
    (6, "Accountant", 3, 125000),
    (7, "Legal Team Lead", 4, 25000),
    (8, "Lawyer", 4, 190000);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
    (1, "John", "Doe", 1, NULL),
    (2, "Mike", "Chan", 2, 1),
    (3, "Ashley", "Rodriguez", 3, NULL),
    (4, "Kevin", "Tupic", 4, 3),
    (5, "Kunal ", "Singh", 5, NULL),
    (6, "Malia", "Brown", 6, 5),
    (7, "Sarah", "Lourd", 7, NULL),
    (8, "Tom", "Allen", 8, 7);

