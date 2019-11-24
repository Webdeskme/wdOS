$(document).ready(function(){
  const remote = require('electron').remote;
  const {ipcRenderer} = require('electron');
  var fs = require('fs');
  const {shell} = require('electron');
  const wd_homedir = require('os').homedir();
  var wd_home = wd_homedir + '/Documents/wdOS/App/';
  //$("#app").append('<h1>Bill</h1>');
  console.log("Starting OS GUI");
  $("#app").html('');
  var f = fs.readFileSync(wd_homedir + '/Documents/wdOS/Core/pin.json');
  var p = JSON.parse(f);
  files = fs.readdirSync(wd_home);
  for (i = 0; i < files.length; i++) {
    console.log(files[i]);
    if (fs.existsSync(wd_home + files[i] + '/index.html')) {
      var file = fs.readFileSync(wd_home + files[i] + '/wd.json');
      var obj = JSON.parse(file);
      var aname = obj.name.substr(0, 9);
      if(obj.ser != "on"){
        $("#app").append('<div class="col-sm-1 wd_apps" data-toggle="tooltip" title="' + obj.des + '"><a href="' + wd_home + files[i] + '/index.html"><img class="card-img-bottom" src="' + wd_home + files[i] + '/ic.png" alt="' + obj.name + '" style="width:100%"></a><figcaption><a href="' + wd_home + files[i] + '/index.html" class="text-light">' + aname + '</a></figcaption></div>');
      }
      else{
        //alert(p[files[i]]);
        $("#app").append('<div class="col-sm-1 wd_apps" data-toggle="tooltip" title="' + obj.des + '"><a href="http://127.0.0.1:' + p[files[i]] + '/index.html"><img class="card-img-bottom" src="' + wd_home + files[i] + '/ic.png" alt="' + obj.name + '" style="width:100%"></a><figcaption><a href="http://127.0.0.1:' + p[files[i]] + '/index.html" class="text-light">' + aname + '</a></figcaption></div>');
      }
    }
  }
});
