$(document).ready(function(){
	$("#users").load("/sub?app=Admin&sec=userSub.njs&user=" + sessionStorage.getItem("user") + "&token&=" + sessionStorage.getItem("token"));
});
