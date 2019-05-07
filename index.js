$(document).ready(function(){
  const remote = require('electron').remote;
  const {ipcRenderer} = require('electron');
  var exec = require('child_process').exec;
  var fs = require('fs');
  var window = remote.getCurrentWindow();
  $("#shut").click(function(){
    ipcRenderer.send('show-child', "file://" + __dirname + "/shut.html");
  });
  $("#lock").click(function(){
    exec('dbus-send --type=method_call --dest=org.gnome.ScreenSaver /org/gnome/ScreenSaver org.gnome.ScreenSaver.Lock');
  });
  $("#cos").click(function(){
    window.close();
  });
  $("#cc").click(function(){
    exec('shutdown now');
  });
  $("#browser").click(function(){
    ipcRenderer.send('show-child', "file://" + __dirname + "/browser.html");
  });
  /*$("#c1").click(function(){
    exec('touch /home/pipertel/Documents/123456.ab');
  });*/
  ///////
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
