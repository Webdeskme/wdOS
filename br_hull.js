var fs = require('fs');
var SHA256 = require("crypto-js/sha256");
const wd_homedir = require('os').homedir();
var wd_home = wd_homedir + '/Documents/wdOS/Core/dh_hull/ac.json';
$(document).ready(function(){
	$("#submit").click(function(){
		var ac = $('#ac').val();
		var user = $('#user').val();
		var pwd = $('#pwd').val();
		pwd = SHA256(pwd);
		if (!fs.existsSync(wd_home)) {
      			var obj = {};
			obj[ac] = {ac: ac, user: user, pwd: pwd};
    		}
		else{
			var obj = JSON.parse(fs.readFileSync(wd_home, 'utf8'));
			obj[ac] = {ac: ac, user: user, pwd: pwd};
		}
		var json = JSON.stringify (obj);
		fs.writeFileSync(wd_home, json);
		alert('Saved');
	});
	if(fs.existsSync(wd_home)){
		var objl = JSON.parse(fs.readFileSync(wd_home, 'utf8'));
		var con = '<ul class="list-group">';
		for (var key in objl) {
			con = con + '<li class="list-group-item">' + objl[key]['ac'] + ' => ' + objl[key]['user']  + '</li>';
		}
		con = con + '</ul>';
		$('#list').html(con);
	}
});
