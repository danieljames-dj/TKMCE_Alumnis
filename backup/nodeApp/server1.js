xvar express = require('express');
var app = express();

   
var mysql = require("mysql");

// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "localhost",
  user: "dany",
  password: "emmaus",
  database: "node"
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});
con.query('SELECT * FROM users',function(err,rows){
  if(err) throw err;

  console.log('Data received from Db:\n');
  console.log(rows);
});

con.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});

var app=express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send',function(req,res){
    var data=req.body.x;
    var sqr=data*data;
    var result ={'sqr':sqr};
    console.log(result);
    res.json(result);
});
var connect = require("connect");

var app = connect().use(express.static('/Users/danieljames/Codes/djdany444.github.io/nodeApp'+ '/public'));
app.listen(8081);
console.log('Server up @ port ' + 8081);