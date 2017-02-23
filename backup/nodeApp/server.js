var express = require('express');
var app = express();

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
app.listen(8080);
var connect = require("connect");

app = connect().use(express.static('/Users/danieljames/Codes/djdany444.github.io/nodeApp'+ '/public'));
console.log('Server up @ port ' + 8081);