$(document).ready(function(){
  const remote = require('electron').remote;
  const {ipcRenderer} = require('electron');
  var exec = require('child_process').exec;
  var fs = require('fs-extra');
  const {shell} = require('electron');
  const wd_homedir = require('os').homedir();
  var wd_home = wd_homedir + '/Documents/wdOS/';
  $("#sf").click(function(){
    shell.openItem(wd_home);
  });
  $("#oa").click(function(){
    shell.openItem(wd_home + 'App/');
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
    ipcRenderer.send('adminURL-child', "https://market.webdesk.me");
  });
  $("#cog").click(function(){
    ipcRenderer.send('adminURL-child', "https://www.webfra.me");
  });
  $("#cma").click(function(){
    var title = $("#title").val();
    var des= $("#des").val();
    var ser= $("#ser").val();
    if (!fs.existsSync(wd_home + 'App/' + title + '/')) {
      fs.mkdirSync(wd_home + 'App/' + title + '/');
      fs.writeFileSync(wd_home + 'App/' + title + '/wd.json', '{"name":"' + title + '", "dec":"' + des + '","ser":' + ser + '}');
      fs.copy(__dirname + '/Examples/Sample/ic.png', wd_home + 'App/' + title + '/ic.png');
      fs.copy(__dirname + '/Examples/Sample/index.html', wd_home + 'App/' + title + '/index.html');
      shell.openItem(wd_home + 'App/');
      alert("App created. Press ok to finish. You may have to view reload if you do not see the app at first.");
    }
    else{
        alert("App already exists.");
    }
  });
  $("#help").click(function(){
    ipcRenderer.send('help-child', "file://" + __dirname + "/Help/index.html");
  });
  $("#set").click(function(){
    ipcRenderer.send('admin-child', "file://" + __dirname + "/set.html");
  });
});
