$(document).ready(function(){
  $("#submit").click(function(){
	  text = $("#edit").val();
	  const urlParams = new URLSearchParams(window.location.search);
	  const app = urlParams.get('app');
      const sec = urlParams.get('sec');
      const dir = urlParams.get('dir');
      const file = urlParams.get('file');
    $.post("/sub",
  {
    con: text, dir: dir, file:file, user: sessionStorage.getItem("user"), token: sessionStorage.getItem("token"), app: app, sec: 'fileSub'
  },
  function(data, status){
	 alert(status + ": " + data); 
  });
  });
});
