var express = require('express');
var app = express();
var bodyparser = require('body-parser');
// var fileUpload = require('express-fileupload');
app.use(express.static('public'));
app.use(bodyparser.json({limit: '50mb'}));
// app.use(fileUpload());
var mysql = require("mysql");
var fs = require("fs");
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
	var count = 0, writeStream, fileName = [];
	var getCount = function(err, data) {
		count = parseInt(data);
		if (req.body.file1 != 'undefined') {
			count++;
			writeStream = fs.createWriteStream("./pics/" + count);
			writeStream.write(req.body.file1);
			writeStream.end();
			fileName[0] = count;
		} else {
			fileName[0] = 0;
		}
		if (req.body.file2 != 'undefined') {
			count++;
			writeStream = fs.createWriteStream("./pics/" + count);
			writeStream.write(req.body.file2);
			writeStream.end();
			fileName[1] = count;
		} else {
			fileName[1] = 0;
		}
		if (req.body.file3 != 'undefined') {
			count++;
			writeStream = fs.createWriteStream("./pics/" + count);
			writeStream.write(req.body.file3);
			writeStream.end();
			fileName[2] = count;
		} else {
			fileName[2] = 0;
		}
		if (req.body.file4 != 'undefined') {
			count++;
			writeStream = fs.createWriteStream("./pics/" + count);
			writeStream.write(req.body.file4);
			writeStream.end();
			fileName[3] = count;
		} else {
			fileName[3] = 0;
		}
		var writeStream = fs.createWriteStream("./pics/count");
		writeStream.write("" + count);
		writeStream.end();
		if (req.body.name != 'Select Name') {
			con.query("update users set" +
				" gName = " + "'" + req.body.gName + "'," +
				" gEmail = " + "'" + req.body.gEmail + "'," +
				" name_alt = " + "'" + req.body.altName + "'," +
				" email = " + "'" + req.body.email + "'," +
				" contact = " + "'" + req.body.contact + "'," +
				" address_new = " + "'" + req.body.address + "'," +
				" location_current = " + "'" + req.body.location + "'," +
				" intro = " + "'" + req.body.introduction + "'," +
				" old_face = " + "'" + fileName[0] + "'," +
				" new_face = " + "'" + fileName[1] + "'," +
				" familyPic1 = " + "'" + fileName[2] + "'," +
				" familyPic2 = " + "'" + fileName[3] + "'" +
				" where name = '" + req.body.name + "'",function(err,rows){
					console.log(err);
					console.log(rows);
				});
			res.json({
				success: true
			});
		}
	}
	fs.readFile('./pics/count', 'utf8', getCount);
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

app.post('/getNonApproved',function(req,res) {
	console.log(req.body);
	con.query('select gName, gEmail, name, email from users where gEmail != \'NULL\' and status = 0',function(err,rows){
		console.log(rows);
		res.json({
			rows: rows
		});
	});
});

app.post('/getUser',function(req,res) {
	console.log(req.body);
	con.query('select * from users where gEmail=\''+req.body.gEmail+'\'',function(err,rows){
		console.log(rows);
		if (!err && rows.length > 0) {
			res.json({
				success: true,
				details: rows[0]
			});
		} else {
			res.json({
				success: false,
				details: null
			});
		}
	});
});

app.post('/getRegdList',function(req,res) {
	console.log(req.body);
	con.query('select * from users where status=1',function(err,rows){
		console.log(rows);
		if (!err && rows.length > 0) {
			res.json({
				success: true,
				details: rows
			});
		} else {
			res.json({
				success: false,
				details: null
			});
		}
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

app.post('/approve',function(req,res) {
	console.log(req.body);
	con.query("update users set" +
		" status = 1 where name = '" + req.body.name + "' and gEmail = '" + req.body.gEmail + "'",function(err,rows){
			console.log(err);
			console.log(rows);
		});
	res.json({
		success: true
	});
	// con.query("delete from users;",function(err,rows){});
	// con.query(req.body.query,function(err,rows){
	// 	console.log(err);
	// 	console.log(rows);
	// });
	// con.query("update users set status = 0;",function(err,rows){});
});

app.post('/delete',function(req,res) {
	console.log(req.body);
	// con.query("delete from users;",function(err,rows){});
	// con.query(req.body.query,function(err,rows){
	// 	console.log(err);
	// 	console.log(rows);
	// });
	// con.query("update users set status = 0;",function(err,rows){});
});

app.listen(8081, function() {
	console.log("Server listening to port 8081");
});
