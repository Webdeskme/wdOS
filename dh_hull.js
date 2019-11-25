var express = require('express');
var bodyParser = require("body-parser");
//var favicon = require("serve-favicon");
//db.use(favicon(__dirname + '/favicon.ico'));
const dh = require('os').homedir();
var dh_dir = dh + '/Documents/wdOS/Core/dh_hull';
var fs = require('fs');
var db = express();
db.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
db.use(bodyParser.json()); // support json encoded bodies
db.get('/get', function (req, res) {
  var key = req.query.api;
  var user_id = req.query.id;
  var token = req.query.token;
  var geo = req.query.geo;
  res.send(key + ' ' + user_id + ' ' + token + ' ' + geo);
});
db.post('/post', function(req, res) {
  console.log(req.body);
  var key = req.query.api;
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;

    res.send(key + ' ' + user_id + ' ' + token + ' ' + geo);
});
db.listen(4002, function () {
    console.log('DeskHull listening on port 4002.');
});
