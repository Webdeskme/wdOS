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
			console.log("Data: " + data + "\nStatus: " + status);
			alert("Data: " + data);
		});
	});
});
