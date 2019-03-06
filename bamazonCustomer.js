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

var currentProduct = {
  id: 0,
  quantity: 0
}
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
      //connection.end();
     
    });

}
function updateiventory(itemId, newQuantity){
  connection.query(
    "UPDATE bamazon_db.products SET stock_quantity = ? WHERE ?", [parseInt(newQuantity),
    {
      item_id: parseInt(itemId)
    }],
    function(err, res) {
      console.log(res);
      console.log("newQuantity :" , newQuantity);
      // console.log(err);
    }
  );
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
    currentProduct.quantity = answer.unit;
    currentProduct.id = answer.item_id;

    connection.query(
      "SELECT * FROM products WHERE ?",
      {
        item_id:parseInt(answer.item_id)
      },
      function(err, res) {
        if (err) throw err;
        
        if (res.stock_quantity < currentProduct.quantity) {
          console.log('Insufficient quantity!');
        }
        else{
          console.log("Here is your product!");
          console.log("res.stock_quantity",res[0].stock_quantity);
          console.log("currentProduct.quantity",currentProduct.quantity);
          updateiventory(answer.item_id, res[0].stock_quantity - currentProduct.quantity);
        }

      });
    })
  }