$(document).ready(function(){
  $("#login").click(function(){
    var userl = $('#user').val();
    var pwdl = $('#pwd').val();
    $.post("/webframe/post",
  {
    user: userl,
    pwd: pwdl
  },
  function(data, status){
  console.log("Data: " + data + "\nStatus: " + status);
  if(data == 'bad'){
    alert('Error: Bad username pasword cobo.');
  }
  else{
	  sessionStorage.setItem("user", userl);
    sessionStorage.setItem("token", data);
    window.location.assign("/WebFrame/desktop.html");
    //alert("You are in!");
  }
  });
  });
});
