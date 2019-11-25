$(document).ready(function(){
  $("#login").click(function(){
    var userl = $('#user').val();
    var pwdl = $('#pwd').val();
    /*

    var  formData = "name=ravi&age=31";  //Name value Pair
        or
    var formData = {name:"ravi",age:"31"}; //Array

    $.ajax({
        url : "AJAX_POST_URL",
        type: "POST",
        data : formData,
        success: function(data, textStatus, jqXHR)
        {
            //data - response from server
        },
        error: function (jqXHR, textStatus, errorThrown)
        {

        }
    });

    
    $.ajax({
      type: 'POST',
      url: url,
      data: data,
      success: success,
      dataType: dataType,
      async:false
    });*/
    $.post("http://192.168.2.13:4002/login",
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
    sessionStorage.setItem("token", data);
    window.location.assign("desktop.html");
  }
  });
  });
});
