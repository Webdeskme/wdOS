var fs = require('fs');
const dh = require('os').homedir();
var wf_dir = dh + '/Documents/wdOS/Core/webframe.txt';
$(document).ready(function(){
	$("#submit").click(function(){
		var url = $('#url').val();
		var user = $('#user').val();
		var pwd = $('#pwd').val();
		var ac = $('#ac').val();
		$.post(url,
			{
				user: user,
				pwd: pwd,
				ac: ac
			},
			function(data, status){
			fs.writeFileSync(wf_dir, data);
			console.log("Data: " + data + "\nStatus: " + status);
			alert(data);
		});
	});
});
