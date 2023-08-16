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
        choices: ['view all depts', 'view all roles', 'view all employees', 'add a dept', 'add a role', 'add an employee', 'update employee'],
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


  });

};


const addRole = () => {
      db.query('SELECT * FROM departments', function(err, departments) {
        if(err) {console.log(err)};
        departments = departments.map((department) => {
          return {name: department.name, value: department.id}
        });
      });
      inquirer
      .prompt([
        {
            type: 'input',
            message: 'Enter role title',
            name: 'title'
        },
        {
          type: 'input',
          message: 'What is the salary?',
          name: 'salary' 
        },
        {
          type: 'rawlist',
          message: 'What department does this role belong to?',
          choices: departments,
          name: dept
        }
      ])
      .then((choices) => { 
        db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${choices.title}', '${choices.salry}', '${choices.dept}')`, function(err, results) {
          if (err) {throw err};
          console.log('ADDED!');
          init();
        });
    })};