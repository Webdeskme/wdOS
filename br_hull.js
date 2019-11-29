var fs = require('fs');
var SHA256 = require("crypto-js/sha256");
const wd_homedir = require('os').homedir();
var wd_home = wd_homedir + '/Documents/wdOS/Core/dh_hull/';
$(document).ready(function(){
	$("#submit").click(function(){
		var ac = $('#ac').val();
		var user = $('#user').val();
		var pwd = $('#pwd').val();
		/*var items = Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9");
		for (i = 0; i < 63; i++) {
		        	var item = items[Math.floor(Math.random()*items.length)];
		        	key += item;
			}
		key = SHA256(key);*/
		var key = 'blank';
		pwd = SHA256(pwd);
		pwd = pwd.toString();
		if (!fs.existsSync(wd_home + 'ac.json')) {
      			var obj = {};
			obj[ac] = {ac: ac, user: user, pwd: pwd, key: key};
    		}
		else{
			var obj = JSON.parse(fs.readFileSync(wd_home + 'ac.json', 'utf8'));
			obj[ac] = {ac: ac, user: user, pwd: pwd, key: key};
		}
		var json = JSON.stringify (obj);
		fs.writeFileSync(wd_home + 'ac.json', json);
		if (!fs.existsSync(wd_home + 'Account/' + ac + '/')) {
			fs.mkdirSync(wd_home + 'Account/' + ac + '/');
			fs.mkdirSync(wd_home + 'Account/' + ac + '/db/');
		}
		if(!fs.existsSync(wd_home + 'Account/' + ac + '/user.json')){
			var obj = {};
			obj[user] = {user:user, pwd:pwd, tier:"root", token: key};
			
		}
		else{
			var obj = JSON.parse(fs.readFileSync(wd_home + 'Account/' + ac + '/user.json', 'utf8'));
			obj[user] = {user:user, pwd:pwd, tier:"root", token: key};
		}
		var json = JSON.stringify (obj);
		fs.writeFileSync(wd_home + 'Account/' + ac + '/user.json', json);
		alert('Saved');
	});
	if(fs.existsSync(wd_home)){
		var objl = JSON.parse(fs.readFileSync(wd_home + 'ac.json', 'utf8'));
		var con = '<ul class="list-group">';
		for (var key in objl) {
			con = con + '<li class="list-group-item">' + objl[key]['ac'] + ' => ' + objl[key]['user']  + '</li>';
		}
		con = con + '</ul>';
		$('#list').html(con);
	}
});
