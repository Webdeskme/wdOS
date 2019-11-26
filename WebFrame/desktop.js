if(!sessionStorage.token){
  window.location.assign("index.html");
}
else{
  $.post("http://127.0.0.1:4002/check",
  {
    token: sessionStorage.getItem("token")
  },
  function(data, status){
    console.log(data);
    if(data != 'yes'){
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
          $("#head").load("../apps/" + app + "/header.html");
          $("#app").load("../apps/" + app + "/" + sec + ".html");
          $("#foot").load("../apps/" + app + "/footer.html");
        }
        else{
          $("#head").load("../apps/" + app + "/header.html");
          $("#app").load("../apps/" + app + "/index.html");
          $("#foot").load("../apps/" + app + "/footer.html");
        }
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
