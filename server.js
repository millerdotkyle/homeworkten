const mysql = require('mysql2');
const inquirer = require('inquirer');
const { async } = require('rxjs');
const { resolve } = require('path');
const { rejects } = require('assert');
const { error } = require('console');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'thereisnofatebutwhatwemake',
      database: 'company_db'
    },
    console.log(`Connected to the database.`)
  );
  
init = () => {
  inquirer
  .prompt([
    {
        type: 'list',
        message: 'What operation would you like to perform?',
        choices: ['view all depts', 'view all roles', 'view all employees', 'add a dept', 'add a role', 'add an employee', 'update employee role'],
        name: 'op'
    }
  ])
  .then((choice) => { 
    
    console.log(choice.op);

    if(choice.op === "view all depts") {
      db.query('SELECT * FROM departments', function(err, results) {
        console.log(results);
      });
    };
    if(choice.op === "view all roles") {
      db.query('SELECT * FROM roles', function(err, results) {
        console.log(results);
      });
    };
    if(choice.op === "view all employees") {
      db.query('SELECT * FROM employees', function(err, results) {
        console.log(results);
      });
    };

    if(choice.op === "add a dept") {
      inquirer
      .prompt([
        {
            type: 'input',
            message: 'Enter name',
            name: 'q'
        }
      ])
      .then((choice) => { 
        db.query(`INSERT INTO departments (deptartment_name) VALUES ('${choice.q}')`, function(err, results) {
          console.log(err);
          console.log(results);
        });
    })
    };


    if(choice.op === "add a role") {
      addRole();
    };

    if(choice.op === "add an employee") {
      addEmployee();
    };


  });

};


addRole = () => {
  db.query(`SELECT * FROM departments;`, (err, res) => {
      if (err) throw err;
      departments = res.map(department => ({name: department.dept_name, value: department.id }));
      console.log(departments);
      inquirer.prompt([
          {
          name: 'title',
          type: 'input',
          message: 'What is the name of the role you want to add?'   
          },
          {
          name: 'salary',
          type: 'input',
          message: 'What is the salary of the role you want to add?'   
          },
          {
          name: 'deptName',
          type: 'list',
          message: 'Which department do you want to add the new role to?',
          choices: departments
          }
      ]).then((choices) => { 
        console.log(choices);
        db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${choices.title}', '${choices.salary}', '${choices.deptName}')`, (err, res) => {
          if (err) {throw err};
          console.log('ADDED!');
          init();
        })
      })
    })
};


addEmployee = () => {
  db.query(`SELECT * FROM roles;`, (err, res) => {
    if (err) throw err;
    let roles = res.map((role) => ({ name: role.title, value: role.id }));
    db.query(`SELECT * FROM employees;`, (err, res) => {
      if (err) throw err;
      let employees = res.map((employee) => ({
        name: employee.first_name + employee.last_name,
        value: employee.id,
      }));
      employees.unshift({'name': 'None', 'value': 0});
      console.log(employees);
      inquirer
        .prompt([
          {
            name: "fname",
            type: "input",
            message: "What is the first name of the new employee?",
          },
          {
            name: "lname",
            type: "input",
            message: "What is the last tname of the new employee?",
          },
          {
            name: "mgr",
            type: "list",
            message: "Who is the manager of the employee you want to add?",
            choices: employees,
          },
          {
            name: "role",
            type: "list",
            message: "What is the role of this new employee?",
            choices: roles,
          },
        ])
        .then((choices) => {
          console.log(choices);
          db.query(
            `INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES ('${choices.fname}', '${choices.lname}', '${choices.mgr}', '${choices.role}')`,
            (err, res) => {
              if (err) {
                throw err;
              }
              console.log("ADDED!");
              init();
            },
          );
        });
    });
  });
};

init();