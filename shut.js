$(document).ready(function(){
  const remote = require('electron').remote;
  const {ipcRenderer} = require('electron');
  var exec = require('child_process').exec;
  var fs = require('fs');
  const {shell} = require('electron');
  const wd_homedir = require('os').homedir();
  var wd_home = wd_homedir + '/Documents/wdOS/';
  $("#sf").click(function(){
    shell.openItem(wd_home);
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
  $("#market").click(function(){
    ipcRenderer.send('adminURL-child', "https://www.webdesk.me");
  });
  $("#cog").click(function(){
    ipcRenderer.send('adminURL-child', "https://www.webfra.me");
  });
  $("#help").click(function(){
    ipcRenderer.send('help-child', "file://" + __dirname + "/Help/index.html");
  });
  $("#set").click(function(){
    ipcRenderer.send('admin-child', "file://" + __dirname + "/set.html");
  });
});
