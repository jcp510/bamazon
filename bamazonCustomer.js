var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

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
      head: ['item_id', 'product_name', 'price'],
      // colWidths: [100, 200, 100]
    });
    
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].price]);
      // console.log(res[i].item_id + " " + res[i].product_name + " " + res[i].price);
    };
    console.log(table.toString());
  });
}