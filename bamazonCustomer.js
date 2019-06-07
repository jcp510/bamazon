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
      type: 'number',
      name: 'item_id',
      message: 'What is the item id of the item you want to buy?'
    },
    {
      type: 'number',
      name: 'purchase_quantity',
      message: 'How many would you like to buy?'
    }
  ];

  inquirer.prompt(questions).then(function(answers) {
    connection.query('SELECT * FROM products WHERE item_id = ?', [answers.item_id], function(err, res, fields) {
      if (err) throw err;
      
      var itemId = answers.item_id;
      var purchQuantity = answers.purchase_quantity;
      var inStock = res[0].stock_quantity;
      var endingStock = inStock - purchQuantity;
      var total = res[0].price * purchQuantity;
      var item = res[0].product_name;

      // Check if there is sufficient quantity to meet user's order.
      // If insufficient quantity, log message advising so.
      if (purchQuantity > inStock) {
        console.log('Insufficient quantity in stock.');
      } else {
        // Fulfill order and update SQL database to reflect remaining stock quantity.
        // Subtract answers.purchase_quantity from res[0].stock_quantity.
        connection.query(
          'UPDATE products SET stock_quantity = ? WHERE item_id = ?', 
          [endingStock, itemId], function(err, res) {
            if (err) throw err;
            
            console.log('Successfully purchased ' + purchQuantity + ' ' + item + 
            '(s).  Your total is ' + total);
        });
      }

    });  
        
  });
      
}
