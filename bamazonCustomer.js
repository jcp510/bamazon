var mysql = require("mysql");
var Table = require('cli-table');
var inquirer = require("inquirer");

// Connection info for sql database.
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon_DB"
});

// Connect to mysql server and sql database.
connection.connect(function(err) {
  if (err) throw err;
  start();
});

// Display all items available for sale. Include ids, names, and prices of
// products for sale.
function start() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    
    // Create command line table for displaying items available for sale.
    var table = new Table({
      head: ['item_id', 'product_name', 'price', 'department_name', 'stock_quantity'],
    });
    
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].price, res[i].department_name, res[i].stock_quantity]);
    };
    console.log(table.toString());
    
    promptUser();
  });
}

function promptUser() {

  // Prompt user with two questions.
  var questions = [
    {
      type: 'input',
      name: 'item_id',
      message: 'What is the item id of the item you want to buy?'
    },
    {
      type: 'input',
      name: 'purchase_quantity',
      message: 'How many would you like to buy?'
    }
  ];

  inquirer.prompt(questions).then(function(answers) {
    // Check if there is sufficient quantity to meet user's order.
    // How do I map item_id from Inquirer to stock_quantity from mysql? 
    connection.query('SELECT * FROM products WHERE item_id = ?', [answers.item_id], function(error, results, fields) {
      // SEEMS SOMETHING IS NOT WORKING HERE, answers.purchase_quantity IS NOT BEING READ?
      if (answers.purchase_quantity > results.stock_quantity) {
        console.log('Insufficient quantity in stock.');
      }
    });
  });
}
