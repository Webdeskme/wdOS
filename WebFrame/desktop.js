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

      $("#head").load("../apps/Test/header.html");
      $("#app").load("../apps/Test/test.html");
      $("#foot").load("../apps/Test/footer.html");
    }
  });
}
