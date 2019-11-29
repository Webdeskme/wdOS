var express = require('express');
var bodyParser = require("body-parser");
var favicon = require("serve-favicon");
const dh = require('os').homedir();
var dh_dir = dh + '/Documents/wdOS/Core/dh_hull/';
var SHA256 = require("crypto-js/sha256");
var fs = require('fs');
var db = express();
db.use(function (req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
res.setHeader('Access-Control-Allow-Credentials', true);
next();
});
db.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
db.use(bodyParser.json()); // support json encoded bodies
db.use(favicon(__dirname + '/favicon.ico'));
db.get('/', function (req, res) {
    res.send('Welcome to the WebDesk api please login to get started or check out our documintation.');
});
db.post('/active', function(req, res) {
  if(fs.existsSync(dh_dir)){
		var obj = JSON.parse(fs.readFileSync(dh_dir + 'ac.json', 'utf8'));
    var ac = req.body.ac;
    var user = req.body.user;
    var pwd = req.body.pwd;
    pwd = SHA256(pwd);
		pwd = pwd.toString();
    if(user == obj[ac]["user"] && pwd == obj[ac]["pwd"]){
      var items = Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9");
		for (i = 0; i < 63; i++) {
		        	var item = items[Math.floor(Math.random()*items.length)];
		        	key += item;
			}
      obj[ac]["key"] = key;
      var json = JSON.stringify (obj);
      fs.writeFileSync(wd_home + 'ac.json', json);
      key = SHA256(key);
      res.send(key);
    }
    else{
      res.send('bad');
    }
  });
});
db.post('/login', function(req, res) {
    var user = req.body.user;
    var pwd = req.body.pwd;
    if(user == 'adam' && pwd == '12345'){
      res.send('afbshjklfb');
    }
    else{
      res.send('bad');
    }
});
db.post('/check', function(req, res) {
  var test = req.body.token;
  if(test == 'afbshjklfb'){
    res.send('yes');
  }
  else{
    res.send('no');
  }
});
db.get('/get', function (req, res) {
  //var key = req.query.api;
  var user_id = req.query.id;
  var token = req.query.token;
  var geo = req.query.geo;
  res.send(user_id + ' ' + token + ' ' + geo);
});
db.post('/post', function(req, res) {
  //console.log(req.body);
  var key = req.query.api;
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;

    res.send(key + ' ' + user_id + ' ' + token + ' ' + geo);
});
db.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});
db.listen(4002, function () {
    console.log('DeskHull listening on port 4002.');
});
