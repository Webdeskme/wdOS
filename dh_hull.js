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
  if(fs.existsSync(dh_dir + 'ac.json')){
		var obj = JSON.parse(fs.readFileSync(dh_dir + 'ac.json', 'utf8'));
    var ac = req.body.ac;
    var user = req.body.user;
    var pwd = req.body.pwd;
    pwd = SHA256(pwd);
		pwd = pwd.toString();
    if (typeof obj[ac] !== 'undefined') {
    if(user === obj[ac]["user"] && pwd === obj[ac]["pwd"]){
      var items = Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9");
		var key = "";
    for (i = 0; i < 63; i++) {
		        	var item = items[Math.floor(Math.random()*items.length)];
		        	key += item;
			}
      ekey = SHA256(key);
      ekey = ekey.toString();
      obj[ac]["key"] = ekey;
      var json = JSON.stringify (obj);
      fs.writeFileSync(dh_dir + 'ac.json', json);
      res.send(key);
    }
    else{
      res.send('bad');
    }
  }
  else{
    res.send('Account is not defined');
  }
  }
  else{
    res.send('Deskhull is not setup on this system');
  }
});
db.post('/login', function(req, res) {
  if(fs.existsSync(dh_dir + 'ac.json')){
    var ac = req.body.ac;
    var key = req.body.key;
    var user = req.body.user;
    var pwd = req.body.pwd;
    var obj = JSON.parse(fs.readFileSync(dh_dir + 'ac.json', 'utf8'));
    key = SHA256(key);
		key = key.toString();
    if (typeof obj[ac] !== 'undefined') {
    if(key === obj[ac]["key"]){
      pwd = SHA256(pwd);
      pwd = pwd.toString();
      var obju = JSON.parse(fs.readFileSync(dh_dir + 'Account/' + ac + '/user.json', 'utf8'));
      if(pwd === obju[user]["pwd"]){
        var items = Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9");
		var token = "";
    for (i = 0; i < 63; i++) {
		        	var item = items[Math.floor(Math.random()*items.length)];
		        	token += item;
			}
      etoken = SHA256(token);
      etoken = etoken.toString();
      obju[user]["token"] = etoken;
      var jsonu = JSON.stringify (obju);
      fs.writeFileSync(dh_dir + 'Account/' + ac + '/user.json', jsonu);
      res.send(token);
      }
      else{
      res.send('bad');
    }
  }
  else{
      res.send('bad key');
    }
}
else{
    res.send('Account is not defined');
  }
  }
  else{
    res.send('Deskhull is not setup on this system');
  }
});
db.post('/post', function(req, res) {
	if(fs.existsSync(dh_dir + 'ac.json')){
		var ac = req.body.ac;
		var key = req.body.key;
		var obj = JSON.parse(fs.readFileSync(dh_dir + 'ac.json', 'utf8'));
		key = SHA256(key);
		key = key.toString();
		if (typeof obj[ac] !== 'undefined') {
			if(key === obj[ac]["key"]){
				var user = req.body.user;
				var token = req.body.token;
				var us = JSON.parse(fs.readFileSync(dh_dir + 'Account/' + ac + '/user.json', 'utf8'));
				token = SHA256(token);
				token = token.toString();
				if (typeof us[user] !== 'undefined') {
					if(token === us[user]["token"]){
						var db = req.body.db;
						var file = req.body.file;
						var data = req.body.data;
						if (!fs.existsSync(dh_dir + 'Account/' + ac + '/db/' + db + '/')) {
							fs.mkdirSync(dh_dir + 'Account/' + ac + '/db/' + db + '/');
						}
						fs.writeFileSync(dh_dir + 'Account/' + ac + '/db/' + db + '/' + file, data);
						res.send("Saved");
					}
					else{
						res.send("Bad Token");
					}
				}
				else{
					res.send("No User");
				}
			}
			else{
				res.send("Bad Key");
			}
		}
		else{
			res.send("No Account");
		}
	}
	else{
		res.send("No dir");
	}
});
db.post('/get', function(req, res) {
	if(fs.existsSync(dh_dir + 'ac.json')){
		var ac = req.body.ac;
		var key = req.body.key;
		var obj = JSON.parse(fs.readFileSync(dh_dir + 'ac.json', 'utf8'));
		key = SHA256(key);
		key = key.toString();
		if (typeof obj[ac] !== 'undefined') {
			if(key === obj[ac]["key"]){
				var user = req.body.user;
				var token = req.body.token;
				var us = JSON.parse(fs.readFileSync(dh_dir + 'Account/' + ac + '/user.json', 'utf8'));
				token = SHA256(token);
				token = token.toString();
				if (typeof us[user] !== 'undefined') {
					if(token === us[user]["token"]){
						var db = req.body.db;
						var file = req.body.file;
						if (fs.existsSync(dh_dir + 'Account/' + ac + '/db/' + db + '/' + file)) {
							var data = fs.readFileSync(dh_dir + 'Account/' + ac + '/db/' + db + '/' + file);
							res.send(data);
						}
						else{
							res.send("Does not exist.");
						}
					}
					else{
						res.send("Bad Token");
					}
				}
				else{
					res.send("No User");
				}
			}
			else{
				res.send("Bad Key");
			}
		}
		else{
			res.send("No Account");
		}
	}
	else{
		res.send("No dir");
	}
});
/*
db.get('/get', function (req, res) {
  //var key = req.query.api;
  var user_id = req.query.id;
  var token = req.query.token;
  var geo = req.query.geo;
  res.send(user_id + ' ' + token + ' ' + geo);
});
*/
db.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});
db.listen(4002, function () {
    console.log('DeskHull listening on port 4002.');
});
