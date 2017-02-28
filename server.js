var express = require('express');
var app = express();
var bodyparser = require('body-parser');
app.use(express.static('public'));
app.use(bodyparser.json());
var mysql = require("mysql");
var jwt = require('jsonwebtoken');
app.set('superSecret', 'tkmce87');
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
  console.log('Database Connection established');
});
app.post('/signin',function(req,res) {
	console.log(req.body);
	con.query('select * from users where name=\''+req.body.email+'\' and password='+req.body.password,function(err,rows){
		if (rows) {
			var token = jwt.sign(rows[0], app.get('superSecret'), {
	          expiresIn: 1440
	        });
	        res.json({
	          success: true,
	          message: 'Enjoy your token!',
	          token: token
	        });
		} else
			console.log("Wrong email ID/password");
	});
});
app.post('/register',function(req,res) {
	console.log(req.body);
	con.query("update users set" +
		" name_alt = " + "'" + req.body.altName + "'," +
		" email = " + "'" + req.body.email + "'," +
		" address_new = " + "'" + req.body.address + "'," +
		" location_current = " + "'" + req.body.location + "'," +
		" contact = " + "'" + req.body.contact + "'," +
		" intro = " + "'" + req.body.introduction + "'," +
		" password = " + "'" + req.body.password + "'",function(err,rows){});
});
app.post('/tokenCheck',function(req,res) {
	jwt.verify(req.body.token, app.get('superSecret'), function(err, decoded) {
		if (err)
			return res.json({success:true});
		else
			return res.json({success:false});
	});
});
app.listen(8081, function() {
	console.log("Server listening to port 8081");
});
