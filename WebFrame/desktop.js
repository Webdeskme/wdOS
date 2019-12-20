if(!sessionStorage.token){
  window.location.assign("index.html");
}
else{
  $.post("/check",
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
          $("#head").load("app.html" + window.location.search + "&wf_p=header&wf_a=" + app + "&wf_u=" + sessionStorage.getItem("user") + "&wf_t=" + sessionStorage.getItem("token"));
          $("#app").load("app.html" + window.location.search + "&wf_p=" + sec + "&wf_a=" + app + "&wf_u=" + sessionStorage.getItem("user") + "&wf_t=" + sessionStorage.getItem("token"));
          $("#foot").load("app.html" + window.location.search + "&wf_p=footer&wf_a=" + app + "&wf_u=" + sessionStorage.getItem("user") + "&wf_t=" + sessionStorage.getItem("token"));
        }
        else{
          $("#head").load("app.html" + window.location.search + "&wf_p=header&a=" + app + "&wf_u=" + sessionStorage.getItem("user") + "&wf_t=" + sessionStorage.getItem("token"));
          $("#app").load("app.html" + window.location.search + "&wf_p=index&a=" + app + "&wf_u=" + sessionStorage.getItem("user") + "&wf_t=" + sessionStorage.getItem("token"));
          $("#foot").load("app.html" + window.location.search + "&wf_p=footer&a=" + app + "&wf_u=" + sessionStorage.getItem("user") + "&wf_t=" + sessionStorage.getItem("token"));
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
