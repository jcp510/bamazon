var mysql = require("mysql");
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

function start() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Display all items available for sale. Include ids, names, and prices of
    // products for sale.
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " " + res[i].product_name + " " + res[i].price);
    };
  });
}