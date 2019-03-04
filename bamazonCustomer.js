var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "nenafofo83",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
  askCustomer();
});
function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
     
    });

}
function askCustomer() {

  inquirer
  .prompt([
    {
      name: "item_id",
      type: "input",
      message: "What is the ID of the product you would like to buy?"
    },
  {
    name: "unit",
    type: "input",
    message: "How many units of the product you would like to buy?"
  }
])
  .then(function(answer) {
    // when finished prompting, insert a new item into the db with that info
    connection.query(
      "SELECT FROM products WHERE ?",
      {
        item_id: answer.item_id
      },
      function(err, res) {
        if (err) throw err;

        if (res.stock_quantity < answer.stock_quantiy) {
          console.log('Not enough inventory');
        }
      });
    })
  }