$(document).ready(function(){
	$.post("/read", {user: sessionStorage.getItem("user"), token: sessionStorage.getItem("token"), app: "wf_users", file: "user.json"}, function(result){
		var json = $.parseJSON(result);
		for(var key in json){
			if (Object.prototype.hasOwnProperty.call(json, key)) {
				$("#users").append('<a href="desktop.html?app=Admin&sec=user&u=' + json[key]["user"] + '" class="list-group-item list-group-item-action">' + json[key]["user"] + '</a>');
			}
		}
		$('#add').click(function(){
	    	var nu = $("#nu").val();
			var pwd = $("#pwd").val();
			var k = '';
			var items = Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9");
			for (i = 0; i < 63; i++) {
						var item = items[Math.floor(Math.random()*items.length)];
						k += item;
				}
			json[nu] = {
				user: nu,
				pwd: "New-" + pwd,
				tier: "1",
				token: k
			}
			con = JSON.stringify (json);
			$.post("/write", {user: sessionStorage.getItem("user"), token: sessionStorage.getItem("token"), app: "wf_users", file: "user.json", con: con}, function(result){
				alert("Saved");
				location.reload();
			});
	  	});
  	});
});
