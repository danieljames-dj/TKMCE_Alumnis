var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
app.use(express.static('public'));
app.use(bodyparser.json());
module.exports = Entry;
app.listen(server_port, server_ip_address, function() {
    console.log('Server Up!');
});