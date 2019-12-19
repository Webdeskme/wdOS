if(!sessionStorage.token){
  window.location.assign("index.html");
}
else{
  $.post("/webframe/check",
  {
    token: sessionStorage.getItem("token"),
    user: sessionStorage.getItem("user")
  },
  function(data, status){
	  //alert(data);
    console.log(data);
    if(data === 'Bad'){
      sessionStorage.clear();
      window.location.assign("index.html");
    }
    else{
      // our code goes here //
      const urlParams = new URLSearchParams(window.location.search);
      const app = urlParams.get('app');
      const sec = urlParams.get('sec');
      //alert(app);
      if (app != null && app != "") {
		 if (sec != null && app != "") {
          $("#head").load("app.html?p=header&a=" + app + "&u=" + sessionStorage.getItem("user") + "&t=" + sessionStorage.getItem("token"));
          $("#app").load("app.html?p=" + sec + "&a=" + app + "&u=" + sessionStorage.getItem("user") + "&t=" + sessionStorage.getItem("token"));
          $("#foot").load("app.html?p=footer&a=" + app + "&u=" + sessionStorage.getItem("user") + "&t=" + sessionStorage.getItem("token"));
        }
        else{
          $("#head").load("app.html?p=header&a=" + app + "&u=" + sessionStorage.getItem("user") + "&t=" + sessionStorage.getItem("token"));
          $("#app").load("app.html?p=index&a=" + app + "&u=" + sessionStorage.getItem("user") + "&t=" + sessionStorage.getItem("token"));
          $("#foot").load("app.html?p=footer&a=" + app + "&u=" + sessionStorage.getItem("user") + "&t=" + sessionStorage.getItem("token"));
        }
        /*if (sec != null && app != "") {
          $("#head").load("../apps/" + app + "/header.html");
          $("#app").load("../apps/" + app + "/" + sec + ".html");
          $("#foot").load("../apps/" + app + "/footer.html");
        }
        else{
          $("#head").load("../apps/" + app + "/header.html");
          $("#app").load("../apps/" + app + "/index.html");
          $("#foot").load("../apps/" + app + "/footer.html");
        }*/
      }
      else{
          //$("#head").html("<b>Choose an App:</b>");
          $("#app").load("apps.html");
          //$("#foot").html("");
          //alert('hi');
      }
    }
  });
}
