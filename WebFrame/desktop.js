if(!sessionStorage.token){
  window.location.assign("index.html");
}
else{
  $.post("http://192.168.2.13:4002/check",
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

      
    }
  });
}
