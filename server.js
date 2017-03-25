var express = require('express');
var app = express();
var bodyparser = require('body-parser');
// var fileUpload = require('express-fileupload');
app.use(express.static('public'));
app.use(bodyparser.json());
// app.use(fileUpload());
var mysql = require("mysql");
var jwt = require('jsonwebtoken');
app.set('superSecret', 'tkmce87');
var con = mysql.createConnection({
  host: "localhost",
  user: "dany",
  password: "emmaus",
  database: "node",
  multipleStatements: true
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
	con.query('select * from users where gEmail=\''+req.body.gEmail+'\'',function(err,rows){
		console.log(rows);
		if (!err && rows.length > 0) {
			if (rows[0].status == 1) {
				res.json({
					success: true
				});
			} else {
				res.json({
					success: false
				});
			}
		} else {
			res.json({
				success: false
			});
		}
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
		" password = " + "'" + req.body.password + "'" +
		" where name = '" + req.body.name + "'",function(err,rows){});
	res.json({
		success: true
	});
});

app.post('/getBranchName',function(req,res) {
	var curUser = null;
	console.log(req.body);
	con.query('select * from users where gEmail=\''+req.body.gEmail+'\'',function(err,rows){
		console.log(rows);
		if (!err && rows.length > 0) {
			curUser = rows[0];
		}
		con.query('select branch,name from users where status = 0 order by branch',function(err,rowsNew){
			console.log(rowsNew);
			if (!err) {
				res.json({
					curUser: curUser,
					rows: rowsNew
				});
			}
		});
	});
});

app.post('/reset',function(req,res) {
	console.log(req.body.query);
	con.query("delete from users;",function(err,rows){});
	con.query(req.body.query,function(err,rows){
		console.log(err);
		console.log(rows);
	});
	con.query("update users set status = 0;",function(err,rows){});
});

app.listen(8081, function() {
	console.log("Server listening to port 8081");
});
