const mysql = require('mysql2');
const inquirer = require('inquirer');

// // Connect to database
// const db = mysql.createConnection(
//     {
//       host: 'localhost',
//       // MySQL username,
//       user: 'root',
//       // MySQL password
//       password: 'thereisnofatebutwhatwemake',
//       database: 'classlist_db'
//     },
//     console.log(`Connected to the classlist_db database.`)
//   );
  



inquirer
  .prompt([
    {
        type: 'list',
        message: 'What operation would you like to perform?',
        choices: ['view all depts', 'view all roles', 'view all employees', 'add a dept', 'add a role', 'add an employee', 'update employee'],
        name: 'op'
    }
  ])
  .then((answers) => {
    console.log(answers);


  });