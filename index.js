$(document).ready(function(){
  const remote = require('electron').remote;
  const {ipcRenderer} = require('electron');
  var exec = require('child_process').exec;
  var fs = require('fs');
  const {shell} = require('electron');
  const wd_homedir = require('os').homedir();
  console.log("Starting OS GUI");
  var wd_home = wd_homedir + '/Documents/wdOS/';
  /*if (!fs.existsSync(wd_home)) {
    fs.mkdirSync(wd_home);
  }
  var wd_dir = wd_home + 'App/';
  if (!fs.existsSync(wd_dir)) {
    fs.mkdirSync(wd_dir);
  }
  var wd_dir = wd_home + 'Docs/';
  if (!fs.existsSync(wd_dir)) {
    fs.mkdirSync(wd_dir);
  }
  var wd_dir = wd_home + 'Core/';
  if (!fs.existsSync(wd_dir)) {
    fs.mkdirSync(wd_dir);
  }*/
  var window = remote.getCurrentWindow();
  $("#shut").click(function(){
    ipcRenderer.send('admin-child', "file://" + __dirname + "/shut.html");
  });
  $("#search").click(function(){
    //var sc = document.getElementById("search-con").value;
    ipcRenderer.send('show-url', "https://duckduckgo.com/");
  });
  $("#p").click(function(){
    //var sc = document.getElementById("search-con").value;
    ipcRenderer.send('admin-child', "file://" + __dirname + "/tabs.html");
  });
  $("#browser").click(function(){
    ipcRenderer.send('show-child', "file://" + __dirname + "/browser.html");
  });
  $("#wd_time").click(function(){
    ipcRenderer.send('admin-child', "file://" + __dirname + "/history.html");
  });
  function startTime() {
    var today = new Date();
    var h = today.getHours();
    if(h>12){
      var p = 'PM';
    }
    else{
      var p = 'AM';
    }
    h = h > 12 ? h - 12 : h;
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('wd_time').innerHTML = h + ":" + m + p;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
startTime();
});
